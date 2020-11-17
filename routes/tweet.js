const express = require('express');
const auth = require('../middleware/auth');
const deleteTweet = require('../utilities/deleteTweet');
const {check, validationResult} = require('express-validator');
const Tweet = require('../models/Tweet');
const TweetList = require('../models/TweetList');
const Like = require('../models/Like');
const Profile = require('../models/Profile');
const mongoose = require('mongoose');
const router = express.Router();

// @route    POST /api/tweet
// @desc     create new tweet
// @access   private
router.post('/', [auth, [
    check('text', 'Text is required').notEmpty()
]], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // get user's TweetList
        const tweetList = await TweetList.findOne({user: req.user.id});

        // create tweet
        let tweet = await Tweet.create({profile: req.user.profile, text: req.body.text});
        
        // add new tweet in tweetList
        tweetList.tweets.unshift({tweet: tweet.id, type: 'tweet'});

        // save tweetList
        await tweetList.save();

        // populate tweet
        tweet = await tweetList.populate({
            path: 'tweets.tweet',
            populate: {
                path: 'profile',
                select: 'name icon',
                populate: {
                    path: 'user',
                    select: 'username'
                }
            }
        }).execPopulate();

        res.status(200).json({tweet: tweet.tweets[0]});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET /api/tweet/:tweetId
// @desc     get tweet
// @access   private
router.get('/:tweetId', auth, async (req, res) => {
    try {
        // get tweet
        const tweet = await Tweet.findById(req.params.tweetId)
                                    .populate({
                                        path: 'profile',
                                        select: 'name icon',
                                        populate: {
                                            path: 'user',
                                            select: 'username'
                                        }
                                    })
                                    .populate({
                                        path: 'replies.profile',
                                        select: 'name icon',
                                        populate: {
                                            path: 'user',
                                            select: 'username'
                                        }
                                    })
                                    .populate({
                                        path: 'retweets.profile',
                                        select: 'name icon bio',
                                        populate: {
                                            path: 'user',
                                            select: 'username'
                                        }
                                    })
                                    .populate({
                                        path: 'likes.profile',
                                        select: 'name icon bio',
                                        populate: {
                                            path: 'user',
                                            select: 'username'
                                        }
                                    });

        // check if tweet is not found
        if(!tweet) {
            return res.status(404).json({msg: 'Tweet not found'});
        }

        res.status(200).json({tweet});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE /api/tweet/:tweetId
// @desc     delete tweet
// @access   private
router.delete('/:tweetId', auth, async (req, res) => {
    try {
        // get tweet
        const tweet = await Tweet.findById(req.params.tweetId);

        // check if tweet is not found
        if(!tweet) {
            return res.status(404).json({msg: 'Tweet not found'});
        }

        // check if tweet does not belong to the current user
        if(tweet.profile.toString() !== req.user.profile) {
            return res.status(401).json({msg: 'Unauthorized'});
        }

        // add current user in tweet.retweets
        tweet.retweets.unshift({profile: {_id: req.user.profile, user: req.user.id}});

        // populate tweet
        await tweet.populate('likes.profile', 'user')
                    .populate('retweets.profile', 'user')
                    .execPopulate();

        // remove likes
        deleteTweet(tweet.id, tweet.likes, Like, 'likes');

        // remove retweets
        deleteTweet(tweet.id, tweet.retweets, TweetList, 'tweets')

        // delete tweet
        await tweet.deleteOne();

        res.status(200).json({msg: 'Tweet deleted'});
    } catch(err) {
        console.log(err.message);

        // check if id is invalid
        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ID'})
        }

        res.status(500).send('Server error');
    }
});

// @route    PUT /api/tweet/:tweetId/like
// @desc     like or unlike tweet
// @access   private
router.put('/:tweetId/like', auth, async (req, res) => {
    try {
        // get tweet
        const tweet = await Tweet.findById(req.params.tweetId);

        // check if tweet is not found
        if(!tweet) {
            return res.status(404).json({msg: 'Tweet not found'});
        }

        // get user's Like
        const like = await Like.findOne({user: req.user.id});

        // check if user already liked the tweet
        let removeIndex = tweet.likes.map(val => val.profile.toString()).indexOf(req.user.profile);

        if(removeIndex !== -1) {
            // unlike tweet
            tweet.likes.splice(removeIndex, 1);

            // remove like in user's Like
            removeIndex = like.likes.map(val => val.tweet.toString()).indexOf(req.params.tweetId);
            like.likes.splice(removeIndex, 1);

            // save
            await tweet.save();
            await like.save();
        } else {
            // like tweet
            tweet.likes.unshift({profile: req.user.profile});

            // add like in user's Like
            like.likes.unshift({tweet: req.params.tweetId});

            // save
            await tweet.save();
            await like.save();
        }

        const profile = await Profile.findById(req.user.profile)
                                        .select('name icon bio')
                                        .populate('user', 'username');

        res.status(200).json({profile});
    } catch(err) {
        console.log(err.message);

        // check if id is invalid
        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ID'});
        }

        res.status(500).send('Server error');
    }
});

// @route    PUT /api/tweet/:tweetId/retweet
// @desc     retweet or undo retweet
// @access   private
router.put('/:tweetId/retweet', auth, async (req, res) => {
    try {
        // get tweet
        let tweet = await Tweet.findById(req.params.tweetId);

        // check if tweet is nbt found
        if(!tweet) {
            return res.status(404).json({msg: 'Tweet not found'});
        }

        // get user's TweetList
        const tweetList = await TweetList.findOne({user: req.user.id});

        // check if already retweeted
        let removeIndex = tweetList.tweets.map(val => val.tweet.toString()).indexOf(req.params.tweetId);

        if(removeIndex !== -1 && tweetList.tweets[removeIndex].type === 'retweet') {
            // undo retweet
            tweetList.tweets.splice(removeIndex, 1);

            // remove retweet
            removeIndex = tweet.retweets.map(val => val.profile.toString()).indexOf(req.user.profile);
            tweet.retweets.splice(removeIndex, 1);

            // save
            await tweetList.save();
            await tweet.save();
        } else {
            // retweet
            tweetList.tweets.unshift({
                tweet: req.params.tweetId,
                type: 'retweet',
                retweetedBy: req.user.profile
            });

            // add retweet
            tweet.retweets.unshift({profile: req.user.profile});

            // save
            await tweetList.save();
            await tweet.save();
        }
                            
        // populate tweet
        tweet = await tweet.populate({
            path: 'profile',
            select: 'name icon bio',
            populate: {
                path: 'user',
                select: 'username'
            }
        }).execPopulate();
        
        const _id = mongoose.Types.ObjectId();

        const retweet = {
            _id,
            tweet,
            type: 'retweet',
            retweetedBy: {
                _id: req.user.profile,
                user: req.user.id,
                name: tweet.profile.name
            },
            date: tweet.date
        }

        res.status(200).json({retweet});
    } catch(err) {
        console.log(err.message);

        // check if id is invalid
        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid Id'});
        }

        res.status(500).send('Server error');
    }
});

// @route    POST /api/tweet/:tweetId/reply
// @desc     reply to a tweet
// @access   private
router.post('/:tweetId/reply', [auth, [
    check('text', 'Text is required').notEmpty()
]], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // get tweet
        let tweet = await Tweet.findById(req.params.tweetId);

        // check if tweet is not found
        if(!tweet) {
            return res.status(404).json({msg: 'Tweet not found'});
        }

        // add reply
        tweet.replies.unshift({profile: req.user.profile, text: req.body.text});

        // save tweet
        await tweet.save();

        // populate tweet
        tweet = await tweet.populate({
            path: 'replies.profile',
            select: 'name icon',
            populate: {
                path: 'user',
                select: 'username'
            }
        }).execPopulate();

        res.status(200).json({reply: tweet.replies[0]});
    } catch(err) {
        console.log(err.message);

        // check if id is invalid
        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ID'});
        }

        res.status(500).send('Server error');
    }
});

// @route    DELET /api/tweet/:tweetId/reply/:replyId
// @desc     delete a reply
// @access   private
router.delete('/:tweetId/reply/:replyId', auth, async (req, res) => {
    try {
        // get tweet
        const tweet = await Tweet.findById(req.params.tweetId);

        // check if tweet is not found
        if(!tweet) {
            return res.status(404).json({msg: 'Tweet not found'});
        }

        // get the index of reply
        const index = tweet.replies.map(val => val._id.toString()).indexOf(req.params.replyId);

        // check if reply is not found
        if(index === -1) {
            return res.status(404).json({msg: 'Reply not found'});
        }

        // check if correct user
        const correctUser = tweet.replies[index].profile.toString() === req.user.profile;

        if(!correctUser) {
            return res.status(401).json({msg: 'Unauthorized'});
        }

        // remove reply
        tweet.replies.splice(index, 1);

        // save
        await tweet.save();

        res.status(200).json({msg: 'Reply deleted'});
    } catch(err) {
        console.log(err.message);

        // check if id is invalid
        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ID'});
        }

        res.status(500).send('Server error');
    }
});

module.exports = router;
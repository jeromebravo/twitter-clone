const express = require('express');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const Profile = require('../models/Profile');
const Follow = require('../models/Follow');
const TweetList = require('../models/TweetList');
const Like = require('../models/Like');
const Tweet = require('../models/Tweet');
const router = express.Router();

// @route    GET /api/profile/:userId
// @desc     get profile
// @access   private
router.get('/:userId', auth, async (req, res) => {
    try {
        // get profile
        const profile = await Profile.findOne({user: req.params.userId}).populate('user', 'username date');

        // check if profile is not found
        if(!profile) {
            return res.status(404).json({msg: 'Profile not found'});
        }

        // get followings and followers
        const follows = await Follow.findOne({user: req.params.userId})
                                    .populate({
                                        path: 'followings.profile',
                                        select: 'name icon bio',
                                        populate: {
                                            path: 'user',
                                            select: 'username'
                                        }
                                    })
                                    .populate({
                                        path: 'followers.profile',
                                        select: 'name icon bio',
                                        populate: {
                                            path: 'user',
                                            select: 'username'
                                        }
                                    });

        // get tweets
        const tweets = await TweetList.findOne({user: req.params.userId})
                                        .populate({
                                            path: 'tweets.tweet',
                                            populate: {
                                                path: 'profile',
                                                select: 'name icon',
                                                populate: {
                                                    path: 'user',
                                                    select: 'username'
                                                }
                                            }
                                        })
                                        .populate('tweets.retweetedBy', 'name user')

        // get likes
        const likes = await Like.findOne({user: req.params.userId})
                                    .populate({
                                        path: 'likes.tweet',
                                        populate: {
                                            path: 'profile',
                                            select: 'name icon',
                                            populate: {
                                                path: 'user',
                                                select: 'username'
                                            }
                                        }
                                    });

        res.status(200).json({profile, follows, tweets: tweets.tweets, likes: likes.likes});
    } catch(err) {
        console.log(err.message);

        // check if id is invalid
        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ID'})
        }

        res.status(500).send('Server error');
    }
});

// @route    PUT /api/profile
// @desc     edit profile
// @access   private
router.put('/', [auth, [
    check('name', 'Name cannot be blank').notEmpty(),
    check('icon', 'Icon is required').exists(),
    check('header', 'Header is required').exists(),
    check('bio', 'Bio is required').exists(),
    check('location', 'Location is required').exists(),
    check('website', 'Website is required').exists(),
    check('birthday', 'Please provide a valid date').isDate()
]], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // check if icon is empty
    if(req.body.icon === '') {
        req.body.icon = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
    }

    // check if header is empty
    if(req.body.header === '') {
        req.body.header = 'https://www.publicdomainpictures.net/pictures/200000/nahled/plain-gray-background.jpg';
    }

    try {
        // update profile
        let profile = await Profile.findByIdAndUpdate(req.user.profile, req.body, {new: true});

        // populate profile
        profile = await profile.populate({
            path: 'user',
            select: 'username date'
        }).execPopulate();
        
        res.status(200).json({profile});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
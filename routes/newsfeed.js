const express = require('express');
const auth = require('../middleware/auth');
const compare = require('../utilities/compare');
const Follow = require('../models/Follow');
const TweetList = require('../models/TweetList');
const router = express.Router();

// @route    GET /api/newsfeed
// @desc     get news feed
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        // get followings
        const follow = await Follow.findOne({user: req.user.id})
                                    .select('followings')
                                    .populate('followings.profile', 'user');

        const userList = [{profile: {_id: req.user.profile, user: req.user.id}}, ...follow.followings];

        // store tweet list
        const tweetList = []

        // loop throught userList
        let i = 0;
        while(i < userList.length) {
            // get tweet
            let tweet = await TweetList.findOne({user: userList[i].profile.user})
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
                                        .populate('tweets.retweetedBy', 'name user');

            // add tweet in tweetList
            tweetList.unshift(...tweet.tweets);

            i++;
        }

        // sort tweetList by descending order
        tweetList.sort(compare);

        res.status(200).json({tweetList});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
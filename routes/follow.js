const express = require('express');
const auth = require('../middleware/auth');
const Follow = require('../models/Follow');
const Profile = require('../models/Profile')
const router = express.Router();

// @route    GET /api/follow
// @desc     get followings
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        const follow = await Follow.findOne({user: req.user.id}).select('followings');

        res.status(200).json({followings: follow.followings});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT /api/follow/:userId
// @desc     follow or unfollow user
// @access   private
router.put('/:userId', auth, async (req, res) => {
    // check if req.user.profile is equal to req.params.profileId
    if(req.user.profile === req.params.profileId) {
        // cannot follow his/her self
        return res.status(400).json({msg: 'Cannot follow yourself'});
    }

    try {
        // get following's profile
        const followingProfile = await Profile.findOne({user: req.params.userId}).select('user');

        // check if profile does not exist
        if(!followingProfile) {
            return res.status(404).json({msg: 'Profile not found'});
        }

        // get current user's follows
        const myFollows = await Follow.findOne({user: req.user.id});

        // get the follows of the following user
        const followingUser = await Follow.findOne({user: followingProfile.user});

        // get following's index
        const followingIndex = myFollows.followings.map(val => val.profile.toString()).indexOf(followingProfile.id);

        // check if already followed
        if(followingIndex !== -1) {
            // unfollow
            myFollows.followings.splice(followingIndex, 1);

            // get follower's index
            const followerIndex = followingUser.followers.map(val => val.profile.toString()).indexOf(req.user.profile);
            
            // remove follower
            followingUser.followers.splice(followerIndex, 1);

            // save
            await myFollows.save();
            await followingUser.save();
        } else {
            // add following
            myFollows.followings.unshift({profile: followingProfile.id});

            // add follower
            followingUser.followers.unshift({profile: req.user.profile});

            // save
            await myFollows.save();
            await followingUser.save();
        }

        res.status(200).json({msg: 'Success'});
    } catch(err) {
        console.log(err.message);

        // check if id is invalid
        if(err.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Invalid ID'})
        }

        res.status(500).send('Server error');
    }
});

module.exports = router;
const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    followings: [{
        profile: {type: mongoose.Types.ObjectId, ref: 'Profile'}
    }],
    followers: [{
        profile: {type: mongoose.Types.ObjectId, ref: 'Profile'}
    }]
});

module.exports = mongoose.model('Follow', FollowSchema);
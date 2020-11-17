const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    profile: {type: mongoose.Types.ObjectId, ref: 'Profile'},
    text: {type: String, required: true},
    replies: [{
        profile: {type: mongoose.Types.ObjectId, ref: 'Profile'},
        text: {type: String, required: true},
        date: {type: Date, default: Date.now}
    }],
    retweets: [{
        profile: {type: mongoose.Types.ObjectId, ref: 'Profile'}
    }],
    likes: [{
        profile: {type: mongoose.Types.ObjectId, ref: 'Profile'}
    }],
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Tweet', TweetSchema);
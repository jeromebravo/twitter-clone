const mongoose = require('mongoose');

const TweetListSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    tweets: [{
        tweet: {type: mongoose.Types.ObjectId, ref: 'Tweet'},
        type: {type: String, required: true},
        retweetedBy: {type: mongoose.Types.ObjectId, ref: 'Profile'},
        date: {type: Date, default: Date.now}
    }]
});

module.exports = mongoose.model('TweetList', TweetListSchema);
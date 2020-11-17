const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    likes: [{
        tweet: {type: mongoose.Types.ObjectId, ref: 'Tweet'}
    }]
})

module.exports = mongoose.model('Like', LikeSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    profile: {type: mongoose.Types.ObjectId, ref: 'Profile'},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
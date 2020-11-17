const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    icon: {type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'},
    header: {type: String, default: 'https://www.publicdomainpictures.net/pictures/200000/nahled/plain-gray-background.jpg'},
    bio: {type: String, default: ''},
    location: {type: String, default: ''},
    website: {type: String, default: ''},
    birthday: {type: String, required: true}
});

module.exports = mongoose.model('Profile', ProfileSchema);
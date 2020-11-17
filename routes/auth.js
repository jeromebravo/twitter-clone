const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Profile = require('../models/Profile');
const TweetList = require('../models/TweetList');
const Follow = require('../models/Follow');
const Like = require('../models/Like');
const router = express.Router();

// @route    POST /api/auth/signup
// @desc     sign up new user
// @access   public
router.post('/signup', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('birthday', 'Please provide a valid date').isDate()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    let {name, email, username, password, birthday} = req.body;

    // check if username does not contain special characters except '_'
    const regex = /[^a-zA-Z0-9_]/;
    const invalid = regex.test(username);

    if(invalid) {
        return res.status(400).json({errors: [{msg: "Username can only contain letters, numbers, and '_'"}]});
    }

    // add @ in the beginning of username
    username = '@' + username;

    try {
        // search user's email
        let user = await User.findOne({email});

        // check if email already exists
        if(user) {
            return res.status(400).json({errors: [{msg: 'Email is already taken'}]});
        }

        // search user's username
        user = await User.findOne({username});

        // check if username already exists
        if(user) {
            return res.status(400).json({errors: [{msg: 'Username is already taken'}]});
        }

        // create user object
        user = {email, username, password};

        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user in database
        user = await User.create(user);

        // create profile
        const profile = await Profile.create({
            user: user.id,
            name,
            birthday
        });

        // add profile id in user
        user.profile = profile.id;
        await user.save();

        // get user's profile
        const currentUser = await Profile.findOne({user: user.id})
                                .select('name icon bio')
                                .populate('user', 'username');

        // create tweet list
        await TweetList.create({user: user.id});

        // create follow
        await Follow.create({user: user.id});

        // create like
        await Like.create({user: user.id});

        // create payload object
        const payload = {
            user: {
                id: user.id,
                profile: profile.id
            }
        };

        // create token
        const token = jwt.sign(payload, config.get('jwtSecret'));

        res.status(200).json({currentUser, token});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST /api/auth/login
// @desc     log in user
// @access   public
router.post('/login', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty()
], async (req, res) => {
    // check if there are errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    // deconstruct req.body
    let {username, password} = req.body;

    // check if username does not have @
    if(username[0] !== '@') {
        username = '@' + username;
    }

    try {
        // search user
        const user = await User.findOne({username});

        // check if user does not exist
        if(!user) {
            return res.status(400).json({errors: [{msg: 'Incorrect username or password'}]});
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        // check if password is incorrect
        if(!isMatch) {
            return res.status(400).json({errors: [{msg: 'Incorrect username or password'}]});
        }

        // get user's profile
        const currentUser = await Profile.findOne({user: user.id})
                                .select('name icon bio')
                                .populate('user', 'username');

        // create payload
        const payload = {
            user: {
                id: user.id,
                profile: currentUser.id
            }
        }

        // create token
        const token = jwt.sign(payload, config.get('jwtSecret'));

        res.status(200).json({currentUser, token});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
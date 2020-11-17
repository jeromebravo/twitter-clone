const express = require('express');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const router = express.Router();

// @route    GET /api/user
// @desc     get current user
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        // get profile
        const currentUser = await Profile.findById(req.user.profile)
                                            .select('name icon bio')
                                            .populate('user', 'username');
        
        res.status(200).json({currentUser});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
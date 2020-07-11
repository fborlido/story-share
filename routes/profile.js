const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// My Stories
router.get('/mystories', ensureAuthenticated, (req, res) => { 
    res.render('profile/mystories', {
        name: req.user.name
    });
});

// Manage account
router.get('/manage', ensureAuthenticated, (req, res) => { 
    res.render('profile/manage', {
        name: req.user.name
    });
});

module.exports = router;
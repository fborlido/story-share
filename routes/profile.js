const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Story = require('../models/Story');

// My Stories
router.get('/mystories', ensureAuthenticated, (req, res) => { 
    Story.find({ author: req.user.id }).sort('-date').populate('author').lean().exec((err, docs) => {
        res.render('profile/mystories', {
            stories: docs
        });
    });
});

// Manage account
router.get('/manage', ensureAuthenticated, (req, res) => { 
    res.render('profile/manage', {
        name: req.user.name
    });
});

module.exports = router;
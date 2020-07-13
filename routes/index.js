const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Story = require('../models/Story');

// Welcome
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    await Story.find().sort('-date').lean().exec((err, docs) => {
        res.render('dashboard', {
            stories: docs
        });
    })
});

module.exports = router;
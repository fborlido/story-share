const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Story = require('../models/Story');

// Welcome
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    const stories = await Story.find().sort('-date').populate('author').lean();
    res.render('dashboard', {
        stories: stories
    });
});

module.exports = router;
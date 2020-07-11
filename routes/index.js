const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Story = require('../models/Story');

// Welcome
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    /* Story.find((err, docs) => {
        res.render('dashboard', {
            stories: docs
        });
    }); */

    Story.find().lean().exec((err, docs) => {
        res.render('dashboard', {
            stories: docs
        });
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Story = require('../models/Story');

// Create Story
router.get('/create', ensureAuthenticated, (req, res) => res.render('stories/newStory'));

// Post new Story
router.post('/create', ensureAuthenticated, (req, res) => {
    const { title, content } = req.body;
    let errors = [];

    // Check fields
    if (!title) {
        errors.push({ msg: 'Your Story must have a title!' });
    }
    else if (!content) {
        errors.push({ msg: 'Your story is empty!' });
    }

    // Check num. characters
    else if (content.length < 150) {
        errors.push({ msg: 'Your story needs to have at least 150 characters!' });
    }

    if (errors.length > 0) {
        res.render('stories/newStory', {
            errors,
            title,
            content
        });
    } else {
        var author = req.user.name;
        const newStory = new Story({
            title,
            content,
            author
        });
        newStory.save().then(story => {
            req.flash('success_msg', 'Your Story was successfully posted!');
            res.redirect('/dashboard');
        })
    }
});

// Single Story Page
router.get('/:id', ensureAuthenticated, async (req, res) => {
    let story = await Story.findById(req.params.id).lean();
    res.render('stories/showStory', {
        story
    });
});


module.exports = router;
const express = require('express');
const router = express.Router();

// Log In Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Post
router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, confirm_password } = req.body;
    let errors = [];

    // check fields
    if (!first_name || !last_name || !email || !password || !confirm_password) {
        errors.push({ msg: 'Please fill in all fields.' })
    }

    // check passwords
    if (password !== confirm_password) {
        errors.push({ msg: 'Passwords don\'t match.' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            first_name,
            last_name,
            email,
            password,
            confirm_password
        })
    } else {
        res.send('correct');
    }


})

module.exports = router;
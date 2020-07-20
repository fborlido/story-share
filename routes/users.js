const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

// Log In Page
router.get('/login', (req, res) => res.render('auth/login'));

// Register Page
router.get('/register', (req, res) => res.render('auth/register', errors = false));

// Register Post
router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, confirm_password } = req.body;
    let errors = [];

    // check fields
    if (!first_name || !last_name || !email || !password || !confirm_password) {
        errors.push({ msg: 'Please fill in all fields.' })
    }

    // Check email
    if (!validateEmail(email)) {
        errors.push({ msg: 'Please enter a valid email address.' })
    }

    // check passwords
    if (password !== confirm_password) {
        errors.push({ msg: 'Passwords don\'t match.' })
    }

    if (errors.length > 0) {
        res.render('auth/register', {
            errors,
            fn_value: first_name,
            ln_value: last_name,
            e_value: email,
            p_value: password,
            cp_value: confirm_password
        });
    } else {
        // Check user exists
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'User already exists.' });
                res.render('auth/register', {
                    errors,
                    fn_value: first_name,
                    ln_value: last_name,
                    e_value: email,
                    p_value: password,
                    cp_value: confirm_password
                });
            } else {
                // Create new User
                var name = first_name.concat(' ').concat(last_name);
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Encrypt password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then(user => {
                          req.flash(
                            'success_msg',
                            'You are now registered and can log in'
                          );
                          res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    });
                  });
            }
        })
    }
});

// Log In Post
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    let errors = [];

    // check fields
    if (!email || !password) {
        errors.push({ msg: 'Please fill in all fields.' })
    }

    // Check email
    if (!validateEmail(email)) {
        errors.push({ msg: 'Please enter a valid email address.' })
    }

    if (errors.length > 0) {
        res.render('auth/login', {
            errors,
            e_value: email,
            p_value: password,
        });
    } else {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    }
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Goodbye!');
    res.redirect('/users/login');
}) 

// User Page
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).lean();
    res.render('user', {
        user: user
    });
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router;
const express = require('express');
const router = express.Router();

// Log In Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

module.exports = router;
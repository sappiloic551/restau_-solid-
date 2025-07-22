const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Route to initiate password reset via email code
router.post('/forgot-password', authController.forgotPassword);

// Route to reset password using verification code
router.post('/reset-password', authController.resetPassword);

module.exports = router;


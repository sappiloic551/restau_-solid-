const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controller/passwordController');
const { loginUser } = require('../controller/loginController');
const validate = require('../middlewear/validateInput');
const { loginSchema, forgotSchema, resetSchema } = require('../utils/validationSchemas');
const { authLimiter } = require('../middlewear/rateLimiter');

// Login route
router.post('/login', authLimiter, validate(loginSchema), loginUser);

// Forgot password
router.post('/forgot-password', authLimiter, validate(forgotSchema), forgotPassword);

// Reset password
router.post('/reset-password', validate(resetSchema), resetPassword);

module.exports = router;
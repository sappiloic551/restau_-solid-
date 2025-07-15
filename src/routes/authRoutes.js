const express = require('express');
const router = express.Router();


const { registerUser } = require('../controller/registerController');
const { loginUser } = require('../controller/loginController');
const { forgotPassword } = require('../controller/passwordController'); 

// Middlewares
const validate = require('../middlewear/validateInput');
const { authLimiter } = require('../middlewear/rateLimiter');

// Validation Schemas
const { registerSchema, loginSchema, forgotSchema } = require('../utils/validationSchemas');

// Registration route
router.post('/register', validate(registerSchema), registerUser);

//Login route with rate limiting
router.post('/login', authLimiter, validate(loginSchema), loginUser);

//Logout route
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully.' });
});

//Forgot password route
router.post('/forgot-password', authLimiter, validate(forgotSchema), forgotPassword);

module.exports = router;

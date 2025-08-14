const bcrypt = require('bcrypt');
const Joi = require('joi');
const Utilisateur = require('../models/Utilisateur');
const generateToken = require('../utils/generateToken');
const sendVerificationCode = require('../utils/emailSender');
const { blacklistToken } = require('../utils/tokenBlacklist');


// Handles all authentication logic: register, login, reset password, etc.

const authController = {
  // User Registration
  async register(req, res) {
    // Validate input data with Joi
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      telephone: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await Utilisateur.create({ ...req.body, password: hashedPassword });
      const token = generateToken(newUser);
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          telephone: newUser.telephone,
          role: newUser.role
        }
      });
    } catch (err) {
      console.log('Registration error:', err);
      return res.status(500).json({ message: 'Server error', error: err });
    }
  },

  // User Login
  async login(req, res) { 
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const user = await Utilisateur.findOne({ where: { email: req.body.email } });
      if (!user) return res.status(400).json({ message: 'Email not found' });

      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) return res.status(400).json({ message: 'Incorrect password' });

      const token = generateToken(user);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          telephone: user.telephone,
          role: user.role
        }
      });
    } catch (err) {
      console.log('Login error:', err);
      return res.status(500).json({ message: 'Server error', error: err });
    }
  },

  // Request password reset
  async forgotPassword(req, res) {
    const schema = Joi.object({
      email: Joi.string().email().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await Utilisateur.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate verification code and expiry
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 mins

    // Save to user model
    user.resetPasswordToken = code;
    user.resetPasswordExpires = expires;
    await user.save();

    try {
      await sendVerificationCode(user.email, code);
      return res.status(200).json({ success: true, message: 'Verification code sent to your email' });
    } catch (err) {
      console.log('Email sending error:', err);
      return res.status(500).json({ success: false, message: 'Failed to send email', error: err });
    }
  },

  // Reset password
  async resetPassword(req, res) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      code: Joi.string().required(),
      newPassword: Joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await Utilisateur.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate code and expiry
    if (user.resetPasswordToken !== req.body.code || new Date() > user.resetPasswordExpires) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password successfully reset' });
  },

  // Logout: blacklist current token
  async logout(req, res) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(400).json({ message: 'Authorization header missing' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(400).json({ message: 'Invalid authorization header format' });
    }
    const token = parts[1];
    blacklistToken(token);
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  }
};

module.exports = authController;

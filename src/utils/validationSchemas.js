
const Joi = require('joi');

const registerSchema = Joi.object({
  nom: Joi.string().min(2).max(100).required(),
  prenom: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  mot_de_passe: Joi.string()
    .min(8)
    .max(255)
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])'))
    .required()
    .messages({
      'string.pattern.base': 'Password must include uppercase, lowercase, digit, and special character.',
    }),
  telephone: Joi.string().optional(),
});


// Login schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  mot_de_passe: Joi.string().required()
});

// Forgot password schema
const forgotSchema = Joi.object({
  email: Joi.string().email().required()
});

// Reset password schema
const resetSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).max(255).required()
});

module.exports = { registerSchema, loginSchema, forgotSchema, resetSchema };

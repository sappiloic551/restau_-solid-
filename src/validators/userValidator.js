const Joi = require('joi');

const updateMeSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  telephone: Joi.string().min(3).max(20),
});

const createUserAdminSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  telephone: Joi.string().min(3).max(20).allow('', null),
  role: Joi.string().valid('utilisateur', 'admin').default('utilisateur'),
});

const updateUserAdminSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  telephone: Joi.string().min(3).max(20).allow('', null),
  role: Joi.string().valid('utilisateur', 'admin'),
});

module.exports = { updateMeSchema, createUserAdminSchema, updateUserAdminSchema };

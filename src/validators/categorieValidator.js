const Joi = require('joi');

const createCategorieSchema = Joi.object({
  nom: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('', null),
});

const updateCategorieSchema = Joi.object({
  nom: Joi.string().min(2).max(100),
  description: Joi.string().allow('', null),
});

module.exports = { createCategorieSchema, updateCategorieSchema };

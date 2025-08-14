const Joi = require('joi');

const createPlatSchema = Joi.object({
  nom_plat: Joi.string().min(2).max(150).required(),
  description_plat: Joi.string().allow('', null),
  image: Joi.string().uri().allow('', null),
  prix: Joi.number().positive().precision(2).required(),
  id_categorie: Joi.number().integer().positive().required(),
});

const updatePlatSchema = Joi.object({
  nom_plat: Joi.string().min(2).max(150),
  description_plat: Joi.string().allow('', null),
  image: Joi.string().uri().allow('', null),
  prix: Joi.number().positive().precision(2),
  id_categorie: Joi.number().integer().positive(),
});

module.exports = { createPlatSchema, updatePlatSchema };

const Joi = require('joi');

const createCommandeSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      id_plat: Joi.number().integer().positive().required(),
      quantite: Joi.number().integer().min(1).required(),
    })
  ).min(1).required(),
});

const updateCommandeStatusSchema = Joi.object({
  statut: Joi.string().valid('en_cours', 'valide', 'livre', 'annule').required(),
});

module.exports = { createCommandeSchema, updateCommandeStatusSchema };

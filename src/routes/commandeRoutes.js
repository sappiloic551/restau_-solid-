const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

// Routes for commandes (orders)

// GET all commandes
router.get('/', commandeController.getAllCommandes);

// GET commande by id
router.get('/:id', commandeController.getCommandeById);

// POST create a new commande
router.post('/', commandeController.createCommande);

// PUT update a commande completely
router.put('/:id', commandeController.updateCommande);

// PATCH partially update a commande
router.patch('/:id', commandeController.updateCommande);

// DELETE a commande by id
router.delete('/:id', commandeController.deleteCommande);

module.exports = router;

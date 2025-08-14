const express = require('express');
const { verifyToken, isAdmin } = require('../middlewear/authMiddleware');
const commandeController = require('../controller/commandeController');

const router = express.Router();

// list all (admin) or mine (user)
router.get('/', verifyToken, commandeController.list);

// get one
router.get('/:id', verifyToken, commandeController.getById);

// create from items
router.post('/', verifyToken, commandeController.create);

// update status
router.patch('/:id/status', verifyToken, commandeController.updateStatus);

// delete
router.delete('/:id', verifyToken, commandeController.remove);

module.exports = router;

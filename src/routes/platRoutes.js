const express = require('express');
const { verifyToken, isAdmin } = require('../middlewear/authMiddleware');
const platController = require('../controller/platController');

const router = express.Router();

router.post('/', verifyToken, isAdmin, platController.create);
router.get('/', platController.list);
router.get('/:id', platController.getById);
router.patch('/:id', verifyToken, isAdmin, platController.update);
router.delete('/:id', verifyToken, isAdmin, platController.remove);

module.exports = router;

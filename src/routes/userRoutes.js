const express = require('express');
const { verifyToken, isAdmin } = require('../middlewear/authMiddleware');
const userController = require('../controller/userController');

const router = express.Router();

// Self endpoints
router.get('/me', verifyToken, userController.me);
router.patch('/me', verifyToken, userController.updateMe);

// Admin endpoints
router.get('/', verifyToken, isAdmin, userController.list);
router.get('/:id', verifyToken, isAdmin, userController.getById);
router.post('/', verifyToken, isAdmin, userController.create);
router.patch('/:id', verifyToken, isAdmin, userController.update);
router.delete('/:id', verifyToken, isAdmin, userController.remove);

module.exports = router;

const express = require('express');
const { verifyToken, isAdmin } = require('../middlewear/authMiddleware');
const categorieController = require('../controller/categorieController');

const router = express.Router();

router.post('/', verifyToken, isAdmin, categorieController.create);
router.get('/', categorieController.list);
router.get('/:id', categorieController.getById);
router.patch('/:id', verifyToken, isAdmin, categorieController.update);
router.delete('/:id', verifyToken, isAdmin, categorieController.remove);

module.exports = router;

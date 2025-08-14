const express = require('express');
const { verifyToken, isAdmin } = require('../middlewear/authMiddleware');
const dashboardController = require('../controller/dashboardController');

const router = express.Router();

router.get('/summary', verifyToken, isAdmin, dashboardController.summary);

module.exports = router;

const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewear/authMiddleware');

router.get('/home', verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome home, user ${req.user.id}` });
});

router.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;

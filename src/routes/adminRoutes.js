const express = require('express');
const router = express.Router();
const auth = require('../middlewear/authMiddleware');
const admin = require('../middlewear/adminMiddleware');


router.get('/dashboard', auth, admin, (req, res) => {
  res.json({ message: `Welcome to the Admin Dashboard, ${req.user.nom}` });
});

module.exports = router;

const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Utilisateur.findByPk(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found.' });

    req.user = user; 
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.', error: error.message });
  }
};

module.exports = authMiddleware;

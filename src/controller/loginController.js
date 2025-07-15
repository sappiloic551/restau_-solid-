const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

const loginUser = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Find user by email
    const user = await Utilisateur.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found.' });

    //Validate password
    const validPass = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!validPass) return res.status(400).json({ message: 'Invalid password.' });

    // Generate JWT token with role info
    const token = jwt.sign(
      { id: user.id_utilisateur, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Role-based redirect
    const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/home';

    res.status(200).json({
      message: 'Login successful.',
      token,
      redirect: redirectPath
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message });
  }
};

module.exports = { loginUser };

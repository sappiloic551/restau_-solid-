const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

const registerUser = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, telephone } = req.body;

    // Check if user already exists
    const existingUser = await Utilisateur.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);

    //Create new user
    const user = await Utilisateur.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      telephone,
    });

    // Token for verification or session
    const token = jwt.sign({ id: user.id_utilisateur, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: { id: user.id_utilisateur, nom: user.nom, role: user.role },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during registration', error: error.message });
  }
};

module.exports = { registerUser };

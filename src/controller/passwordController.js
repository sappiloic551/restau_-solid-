// src/controller/passwordController.js
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/Utilisateur');
const sendEmail = require('../utils/sendEmail');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Utilisateur.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    //Generate token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordtoken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const link = `http://localhost:3000/reset-password?token=${token}`;
    await sendEmail(user.email, 'Password Reset', `<p>Click to reset: <a href="${link}">${link}</a></p>`);

    res.json({ message: 'Reset link sent to email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset email.', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await Utilisateur.findOne({
      where: {
        resetPasswordtoken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token.' });

    const salt = await bcrypt.genSalt(10);
    user.mot_de_passe = await bcrypt.hash(newPassword, salt);
    user.resetPasswordtoken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Reset failed.', error: error.message });
  }
};

module.exports = { forgotPassword, resetPassword };

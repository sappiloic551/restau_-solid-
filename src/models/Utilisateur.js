const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Utilisateur = sequelize.define('Utilisateur', {
  id_utilisateur: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nom: { type: DataTypes.STRING(100), allowNull: false },
  prenom: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  mot_de_passe: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM('utilisateur', 'admin'), defaultValue: 'utilisateur' },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  resetPasswordtoken: { type: DataTypes.STRING },
  resetPasswordExpires: { type: DataTypes.STRING },
  telephone: { type: DataTypes.STRING(20), allowNull: true },
}, {
  tableName: 'utilisateur',
  timestamps: true
});

module.exports = Utilisateur;
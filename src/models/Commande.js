const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Commande = sequelize.define('Commande', {
  id_commande: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date_commande: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  heure_commande: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  statut: {
    type: DataTypes.ENUM('en_cours', 'valide', 'livre', 'annule'),
    defaultValue: 'en_cours',
  },
  montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'commande',
  timestamps: true,
});

module.exports = Commande;

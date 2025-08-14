const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const DemandeServTrait = sequelize.define('DemandeServTrait', {
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_service: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  date_demande: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  statut: {
    type: DataTypes.ENUM('en_attente', 'acceptee', 'refusee'),
    defaultValue: 'en_attente',
  },
}, {
  tableName: 'demande_servtrait',
  timestamps: true,
});

module.exports = DemandeServTrait;

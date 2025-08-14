const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Temoignage = sequelize.define('Temoignage', {
  id_temoignage: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  commentaires: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  notes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 1, max: 5 },
  },
  date_publi: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'temoignage',
  timestamps: true,
});

module.exports = Temoignage;

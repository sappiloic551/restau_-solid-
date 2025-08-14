const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Categorie = sequelize.define('Categorie', {
  id_categorie: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'categorie',
  timestamps: true,
});

module.exports = Categorie;

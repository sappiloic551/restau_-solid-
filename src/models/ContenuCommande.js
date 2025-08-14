const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ContenuCommande = sequelize.define('ContenuCommande', {
  id_commande: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_plat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 },
  },
}, {
  tableName: 'contenu_commande',
  timestamps: false,
});

module.exports = ContenuCommande;

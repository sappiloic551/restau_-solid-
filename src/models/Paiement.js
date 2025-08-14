const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Paiement = sequelize.define('Paiement', {
  id_paiement: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date_paiement: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  montant_paiement: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type_paiement: {
    type: DataTypes.ENUM('carte', 'cash', 'mobile'),
    allowNull: false,
  },
  statut: {
    type: DataTypes.ENUM('initie', 'reussi', 'echoue'),
    defaultValue: 'initie',
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_commande: {
    type: DataTypes.INTEGER,
    allowNull: true, // 0,1 -> 1 selon MCD
    unique: true,
  },
}, {
  tableName: 'paiement',
  timestamps: true,
});

module.exports = Paiement;

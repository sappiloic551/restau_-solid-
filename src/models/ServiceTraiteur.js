const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ServiceTraiteur = sequelize.define('ServiceTraiteur', {
  id_service: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date_evenement: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  heure_evenement: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  type_service: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nombre_convives: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  lieu: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  exigences: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'service_traiteur',
  timestamps: true,
});

module.exports = ServiceTraiteur;

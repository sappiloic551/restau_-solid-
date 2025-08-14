const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Reservation = sequelize.define('Reservation', {
  id_res: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date_res: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  heure_res: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  statut_res: {
    type: DataTypes.ENUM('en_attente', 'confirmee', 'annulee'),
    defaultValue: 'en_attente',
  },
  nombre_pers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'reservation',
  timestamps: true,
});

module.exports = Reservation;

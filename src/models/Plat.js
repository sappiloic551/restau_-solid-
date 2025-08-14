const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Plat = sequelize.define('Plat', {
  id_plat: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom_plat: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  description_plat: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  id_categorie: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'plat',
  timestamps: true,
});

module.exports = Plat;

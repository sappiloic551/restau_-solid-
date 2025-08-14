const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true,
    field: 'id_utilisateur' 
  },
  name: { 
    type: DataTypes.STRING(100), 
    allowNull: false,
    field: 'name' 
  },

  email: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true,
    field: 'email'

  },
  password: { 
    type: DataTypes.STRING(255), 
    allowNull: false,
    field: 'password' 
  },
  role: { 
    type: DataTypes.ENUM('utilisateur', 'admin'), 
    defaultValue: 'utilisateur' 
  },
  isVerified: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false,
    field: 'isVerified' 
  },
  resetPasswordToken: { 
    type: DataTypes.STRING,
    field: 'resetPasswordToken' 
  },
  resetPasswordExpires: { 
    type: DataTypes.DATE,
    field: 'resetPasswordExpires' 
  },
  telephone: { 
    type: DataTypes.STRING(20), 
    allowNull: true,
    field: 'telephone' 
  },
}, {
  tableName: 'utilisateur',
  timestamps: true
});

module.exports = User;

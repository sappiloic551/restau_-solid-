const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const User = sequelize.define('User', {
  id_utilisateur: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING(100), 
    allowNull: false
  
  },
  email: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true
   
  },
  password: { 
    type: DataTypes.STRING(255), 
    allowNull: false
   
  },
  role: { 
    type: DataTypes.ENUM('utilisateur', 'admin'), 
    defaultValue: 'utilisateur' 
  },
  isVerified: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false,
    field: 'isVerified' // or 'is_verified' if your DB uses snake_case
  },
  resetPasswordToken: { 
    type: DataTypes.STRING
   
  },
  resetPasswordExpires: { 
    type: DataTypes.DATE
   
  },
  telephone: { 
    type: DataTypes.STRING(20), 
    allowNull: true
  
  },
}, {
  tableName: 'utilisateur',
  timestamps: true, // ensure your DB has 'createdAt' and 'updatedAt' columns, or specify custom
  // If your columns are snake_case, consider adding:
  // underscored: true,
});

module.exports = User;

const {DataTypes} = require ('sequelize');
const sequelize = require ('../../config/database.js');

const Categorie = sequelize.define ('Categorie', 
{

    id_categorie: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    }
},
    {
        tableName: 'categorie',
        timestamps: false
    });

module.exports = Categorie;

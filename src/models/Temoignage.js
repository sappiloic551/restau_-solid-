const {DataTypes} = require ('sequelize');
const sequelize = require ('../../config/database.js');
const Utilisateur = require('./Utilisateur'); // <-- Add this line

const Temoignage  = sequelize.define ('Temoignage',
    {
        id_temoignage: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        contenu: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    
        note: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        },
        
        date_temoignage: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },

        id_utilisateur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Utilisateur,
                key: 'id_utilisateur'
            }
        }        
    },
       
    {
        tableName: 'temoignage',
        timestamps: false
    });

    module.exports = Temoignage;

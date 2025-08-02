const {DataTypes} = require ('sequelize');
const sequelize = require ('../../config/database.js');

//plat belongs to one categorie

const Plat = sequelize.define  ('Plat',
    {
        id_plat: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom_plat: {
            type: DataTypes.STRING(100)
        },

        description_plat: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING(255)
        },
        prix: {
            type: DataTypes.DECIMAL(10,2)
        },
        id_categorie: {                 //
            type: DataTypes.INTEGER,
            references: {
                model: 'Categorie',
                key: 'id_categorie'
            }
        },
    }, 
    {
        tableName: 'Plat',
        timestamps: false
    });

    module.exports = Plat;

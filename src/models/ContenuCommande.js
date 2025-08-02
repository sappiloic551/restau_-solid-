const  {DataTypes} = require ('sequelize');
const sequelize = require ('../../config/database.js');

// this model links plats with specific commandes and their quantities 
//uses foriegn keys such as id_commande + id_plat

const ContenuCommande = sequelize.define ('ContenuCommande', 
{
        id_commande: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Commande',
                key: 'id_commande'
                        }

        },
        id_plat: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Plat',
                key: 'id_plat'
            }
        },

        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

}, {
    tableName: 'ContenuCommande',
    timestamps: false

});

module.exports = ContenuCommande;

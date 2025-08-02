const  {DataTypes} = require ('sequelize');
const sequelize = require ('../../config/database.js');

//commande models are orders made by users
//each commande is linked to one user
const Commande = sequelize.define ('Commande',
{
    id_commande:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    date_commande: {
        type: DataTypes.DATEONLY

    },
    heure_commande: {
        type: DataTypes.TIME
    },

    status: {
        type: DataTypes.ENUM ('pending', 'valide', 'annullee'),
        allowNull: false,
        defaultValue: 'pending'
    },
    

    montant: {
        type: DataTypes.DECIMAL (10, 2)
    },

    id_utilisateur: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Utilisateur',
            key: 'id_utilisateur'
        }
    }

}, {
    tableName: 'commande',
    timestamps: false

});

module.exports = Commande;

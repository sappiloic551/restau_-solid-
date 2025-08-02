const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Paiement = sequelize.define('Paiement', {
    id_paiement: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    date_paiement: {
        type: DataTypes.DATEONLY
    },

    montant_paiement: {
        type: DataTypes.DECIMAL(10, 2)
    },

    type_paiement: {
        type: DataTypes.ENUM('carte_bancaire', 'orange_money', 'mtn_money'),
        allowNull: false
    },

    status: {
        type: DataTypes.STRING(50)
    },

    id_utilisateur: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Utilisateur',
            key: 'id_utilisateur'
        }
    },

    lieu: {
        type: DataTypes.STRING(100) // you can adjust length as needed
    },

    lheure: {
        type: DataTypes.TIME
    }

}, {
    tableName: 'paiement',
    timestamps: false
});

module.exports = Paiement;

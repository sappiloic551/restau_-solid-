const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Reservation = sequelize.define('Reservation', {
    id_reservation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date_res: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    heure_res: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status_res: {
        type: DataTypes.ENUM('pending', 'valide', 'annullee'),
        allowNull: false,
        defaultValue: 'pending'
    },
    nombre_pers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_paiement: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Paiement',
            key: 'id_paiement'
        }
    },
    telephone: {
        type: DataTypes.STRING(20), // Adjust length based on expected formats
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT, // Allows for longer messages
        allowNull: true
    }
}, {
    tableName: 'Reservation',
    timestamps: false
});

module.exports = Reservation;

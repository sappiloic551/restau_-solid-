const {DataTypes} = require ('sequelize');
const sequelize = require ('../../config/database.js')

const ServiceTraiteur = sequelize.define ('ServiceTraiteur', 
{
 id_service: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
 },
date_evenement: {
    type: DataTypes.DATEONLY,
    allowNull: false
},

heure_evenement: {
    type: DataTypes.TIME,
    allowNull: false
},

type_service: {
    type: DataTypes.STRING(100),
    allowNull: false
},

lieu: {
    type: DataTypes.INTEGER,
    allowNull: false
},

exigences: {
    type: DataTypes.TEXT,
    allowNull: true
},

statut: {
    type: DataTypes.ENUM ('pending', 'valide', 'rejete'),
    defaultValue: 'pending'
},

nombre_convives: {
    type: DataTypes.INTEGER,
    allowNull: false
},
 
created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
},

id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false
}

}, {
    tableName: 'ServiceTraiteur',
    timestamps: false
});

module.exports = ServiceTraiteur;

//exigences
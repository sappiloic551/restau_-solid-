const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

//  Load models in dependency-safe order
const Paiement = require('./Paiement.js');
const Utilisateur = require('./Utilisateur.js');
const Categorie = require('./Categorie.js');
const Plat = require('./Plat.js');
const Commande = require('./Commande.js');
const ContenuCommande = require('./ContenuCommande.js');
const Reservation = require('./Reservation.js');
const Temoignage = require('./Temoignage.js');
const ServiceTraiteur = require('./ServiceTraiteur.js');

//  Define associations
Plat.belongsTo(Categorie, { foreignKey: 'id_categorie', as: 'categorie' });
Categorie.hasMany(Plat, { foreignKey: 'id_categorie' });

Commande.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });
Utilisateur.hasMany(Commande, { foreignKey: 'id_utilisateur' });

ContenuCommande.belongsTo(Commande, { foreignKey: 'id_commande' });
Commande.hasMany(ContenuCommande, { foreignKey: 'id_commande' });

ContenuCommande.belongsTo(Plat, { foreignKey: 'id_plat' });
Plat.hasMany(ContenuCommande, { foreignKey: 'id_plat' });

Reservation.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });
Utilisateur.hasMany(Reservation, { foreignKey: 'id_utilisateur' });

Reservation.belongsTo(Paiement, { foreignKey: 'id_paiement', as: 'paiement' });
Paiement.hasMany(Reservation, { foreignKey: 'id_paiement' });

Temoignage.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });
Utilisateur.hasMany(Temoignage, { foreignKey: 'id_utilisateur' });

ServiceTraiteur.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });
Utilisateur.hasMany(ServiceTraiteur, { foreignKey: 'id_utilisateur' });

// Export all models + sequelize instance
const db = {
  sequelize,
  Sequelize,
  Paiement,
  Utilisateur,
  Categorie,
  Plat,
  Commande,
  ContenuCommande,
  Reservation,
  Temoignage,
  ServiceTraiteur
};

// Optional sync function to sync all models in correct order
db.syncAllModels = async (options = {}) => {
  try {
    await Paiement.sync(options);
    await Utilisateur.sync(options);
    await Categorie.sync(options);
    await Plat.sync(options);
    await Commande.sync(options);
    await ContenuCommande.sync(options);
    await Reservation.sync(options);
    await Temoignage.sync(options);
    await ServiceTraiteur.sync(options);

    console.log(' All models were synced successfully.');
  } catch (err) {
    console.error('Error syncing models:', err);
  }
};

module.exports = db;

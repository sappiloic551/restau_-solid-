const Utilisateur = require('./Utilisateur');
const Categorie = require('./Categorie');
const Plat = require('./Plat');
const Commande = require('./Commande');
const ContenuCommande = require('./ContenuCommande');
const Paiement = require('./Paiement');
const Reservation = require('./Reservation');
const ServiceTraiteur = require('./ServiceTraiteur');
const DemandeServTrait = require('./DemandeServTrait');
const Temoignage = require('./Temoignage');

module.exports = function setupAssociations() {
  // Categorie 1..n Plat
  Categorie.hasMany(Plat, { foreignKey: 'id_categorie' });
  Plat.belongsTo(Categorie, { foreignKey: 'id_categorie' });

  // Utilisateur 1..n Commande
  Utilisateur.hasMany(Commande, { foreignKey: 'id_utilisateur' });
  Commande.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

  // Commande n..n Plat via ContenuCommande
  Commande.belongsToMany(Plat, { through: ContenuCommande, foreignKey: 'id_commande', otherKey: 'id_plat' });
  Plat.belongsToMany(Commande, { through: ContenuCommande, foreignKey: 'id_plat', otherKey: 'id_commande' });

  // Commande 1..1 Paiement (0,1 -> 1)
  Commande.hasOne(Paiement, { foreignKey: 'id_commande' });
  Paiement.belongsTo(Commande, { foreignKey: 'id_commande' });

  // Utilisateur 1..n Paiement
  Utilisateur.hasMany(Paiement, { foreignKey: 'id_utilisateur' });
  Paiement.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

  // Utilisateur 1..n Reservation
  Utilisateur.hasMany(Reservation, { foreignKey: 'id_utilisateur' });
  Reservation.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

  // Utilisateur 1..n Temoignage
  Utilisateur.hasMany(Temoignage, { foreignKey: 'id_utilisateur' });
  Temoignage.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

  // Utilisateur n..n ServiceTraiteur via DemandeServTrait
  Utilisateur.belongsToMany(ServiceTraiteur, { through: DemandeServTrait, foreignKey: 'id_utilisateur', otherKey: 'id_service' });
  ServiceTraiteur.belongsToMany(Utilisateur, { through: DemandeServTrait, foreignKey: 'id_service', otherKey: 'id_utilisateur' });
};

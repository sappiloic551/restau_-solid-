const { Op, fn, col } = require('sequelize');
const Utilisateur = require('../models/Utilisateur');
const Categorie = require('../models/Categorie');
const Plat = require('../models/Plat');
const Commande = require('../models/Commande');

async function getSummary({ userId } = {}) {
  const whereCmd = userId ? { id_utilisateur: userId } : undefined;

  const [users, categories, plats, commandes, revenueRow, recentOrders] = await Promise.all([
    Utilisateur.count(),
    Categorie.count(),
    Plat.count(),
    Commande.count({ where: whereCmd }),
    Commande.findOne({
      attributes: [[fn('COALESCE', fn('SUM', col('montant')), 0), 'total']],
      where: whereCmd,
      raw: true
    }),
    Commande.findAll({
      attributes: ['id_commande', 'date_commande', 'statut', 'montant'],
      where: whereCmd,
      order: [['createdAt', 'DESC']],
      limit: 10,
      raw: true
    })
  ]);

  const revenue = revenueRow ? Number(revenueRow.total) : 0;

  return { users, categories, plats, commandes, revenue, recentOrders };
}

module.exports = { getSummary };

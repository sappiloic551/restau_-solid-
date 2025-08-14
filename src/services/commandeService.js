const { Op } = require('sequelize');
const Commande = require('../models/Commande');
const ContenuCommande = require('../models/ContenuCommande');
const Plat = require('../models/Plat');
const Utilisateur = require('../models/Utilisateur');

async function list(userId, role) {
  const where = role === 'admin' ? {} : { id_utilisateur: userId };
  return Commande.findAll({ where, include: [{ model: Plat }] });
}

async function getById(id, userId, role) {
  const row = await Commande.findByPk(id, { include: [{ model: Plat }] });
  if (!row) return null;
  if (role !== 'admin' && row.id_utilisateur !== userId) return 'forbidden';
  return row;
}

async function createFromItems(userId, items) {
  // fetch plats and compute montant
  const platIds = items.map(i => i.id_plat);
  const plats = await Plat.findAll({ where: { id_plat: { [Op.in]: platIds } } });
  if (plats.length !== platIds.length) {
    const err = new Error('One or more plats not found');
    err.status = 404;
    throw err;
  }
  const now = new Date();
  const date = now.toISOString().slice(0,10);
  const time = now.toTimeString().slice(0,8);
  // calculate total
  let total = 0;
  for (const it of items) {
    const p = plats.find(x => x.id_plat === it.id_plat);
    total += Number(p.prix) * it.quantite;
  }
  const cmd = await Commande.create({ id_utilisateur: userId, date_commande: date, heure_commande: time, montant: total, statut: 'en_cours' });
  // insert contenu
  const bulk = items.map(it => ({ id_commande: cmd.id_commande, id_plat: it.id_plat, quantite: it.quantite }));
  await ContenuCommande.bulkCreate(bulk);
  return getById(cmd.id_commande, userId, 'admin');
}

async function updateStatus(id, statut, userId, role) {
  const cmd = await Commande.findByPk(id);
  if (!cmd) return null;
  if (role !== 'admin' && cmd.id_utilisateur !== userId) return 'forbidden';
  cmd.statut = statut;
  await cmd.save();
  return cmd;
}

async function remove(id, userId, role) {
  const cmd = await Commande.findByPk(id);
  if (!cmd) return null;
  if (role !== 'admin' && cmd.id_utilisateur !== userId) return 'forbidden';
  await ContenuCommande.destroy({ where: { id_commande: id } });
  return Commande.destroy({ where: { id_commande: id } });
}

module.exports = { list, getById, createFromItems, updateStatus, remove };

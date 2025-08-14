const Categorie = require('../models/Categorie');

async function create(data) {
  return Categorie.create(data);
}

async function list() {
  return Categorie.findAll();
}

async function getById(id) {
  return Categorie.findByPk(id);
}

async function update(id, data) {
  const cat = await Categorie.findByPk(id);
  if (!cat) return null;
  await cat.update(data);
  return cat;
}

async function remove(id) {
  return Categorie.destroy({ where: { id_categorie: id } });
}

module.exports = { create, list, getById, update, remove };

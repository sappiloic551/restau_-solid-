const Plat = require('../models/Plat');
const Categorie = require('../models/Categorie');

async function create(data) {
  // ensure category exists
  const cat = await Categorie.findByPk(data.id_categorie);
  if (!cat) {
    const err = new Error('Categorie not found');
    err.status = 404;
    throw err;
  }
  return Plat.create(data);
}

async function list() {
  return Plat.findAll({ include: [{ model: Categorie, attributes: ['id_categorie','nom'] }] });
}

async function getById(id) {
  return Plat.findByPk(id);
}

async function update(id, data) {
  const row = await Plat.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

async function remove(id) {
  return Plat.destroy({ where: { id_plat: id } });
}

module.exports = { create, list, getById, update, remove };

const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

async function getById(id) {
  return Utilisateur.findByPk(id, { attributes: ['id', 'name', 'email', 'telephone', 'role'] });
}

async function updateMe(id, data) {
  const user = await Utilisateur.findByPk(id);
  if (!user) return null;
  if (data.name !== undefined) user.name = data.name;
  if (data.telephone !== undefined) user.telephone = data.telephone;
  await user.save();
  return { id: user.id, name: user.name, email: user.email, telephone: user.telephone, role: user.role };
}

// Admin operations
async function list() {
  return Utilisateur.findAll({ attributes: ['id', 'name', 'email', 'telephone', 'role'] });
}

async function adminGetById(id) {
  return Utilisateur.findByPk(id, { attributes: ['id', 'name', 'email', 'telephone', 'role'] });
}

async function create(data) {
  const payload = { ...data };
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }
  const user = await Utilisateur.create(payload);
  return { id: user.id, name: user.name, email: user.email, telephone: user.telephone, role: user.role };
}

async function update(id, data) {
  if (!Number.isInteger(id) || id <= 0) return null;
  const user = await Utilisateur.findByPk(id);
  if (!user) return null;
  // email uniqueness check
  if (data.email !== undefined && data.email !== user.email) {
    const exists = await Utilisateur.findOne({ where: { email: data.email } });
    if (exists && exists.id !== id) {
      return 'conflict';
    }
    user.email = data.email;
  }
  if (data.name !== undefined) user.name = data.name;
  if (data.telephone !== undefined) user.telephone = data.telephone;
  if (data.role !== undefined) user.role = data.role;
  if (data.password) {
    user.password = await bcrypt.hash(data.password, 10);
  }
  await user.save();
  return { id: user.id, name: user.name, email: user.email, telephone: user.telephone, role: user.role };
}

async function remove(id) {
  return Utilisateur.destroy({ where: { id } });
}

module.exports = { getById, updateMe, list, adminGetById, create, update, remove };

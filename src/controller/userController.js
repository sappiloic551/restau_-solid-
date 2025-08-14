const { updateMeSchema, createUserAdminSchema, updateUserAdminSchema } = require('../validators/userValidator');
const userService = require('../services/userService');

const userController = {
  async me(req, res) {
    const user = await userService.getById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  },

  async updateMe(req, res) {
    const { error } = updateMeSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const updated = await userService.updateMe(req.user.id, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(updated);
  },

  // Admin endpoints
  async list(req, res) {
    const rows = await userService.list();
    return res.status(200).json(rows);
  },

  async getById(req, res) {
    const user = await userService.adminGetById(parseInt(req.params.id, 10));
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  },

  async create(req, res) {
    const { error } = createUserAdminSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const created = await userService.create(req.body);
    return res.status(201).json(created);
  },

  async update(req, res) {
    const { error } = updateUserAdminSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id <= 0) return res.status(400).json({ message: 'Invalid user id' });
    try {
      const updated = await userService.update(id, req.body);
      if (updated === 'conflict') return res.status(409).json({ message: 'Email already in use' });
      if (!updated) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(updated);
    } catch (e) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
  
  async remove(req, res) {
    const deleted = await userService.remove(parseInt(req.params.id, 10));
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    return res.status(204).send();
  }
};

module.exports = userController;

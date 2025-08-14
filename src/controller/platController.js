const { createPlatSchema, updatePlatSchema } = require('../validators/platValidator');
const platService = require('../services/platService');

const platController = {
  async create(req, res) {
    const { error } = createPlatSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
      const created = await platService.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ message: err.message || 'Server error' });
    }
  },
  async list(req, res) {
    const rows = await platService.list();
    return res.status(200).json(rows);
  },
  async getById(req, res) {
    const row = await platService.getById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Plat not found' });
    return res.status(200).json(row);
  },
  async update(req, res) {
    const { error } = updatePlatSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const row = await platService.update(req.params.id, req.body);
    if (!row) return res.status(404).json({ message: 'Plat not found' });
    return res.status(200).json(row);
  },
  async remove(req, res) {
    const deleted = await platService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Plat not found' });
    return res.status(204).send();
  },
};

module.exports = platController;

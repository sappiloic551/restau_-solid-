const { createCommandeSchema, updateCommandeStatusSchema } = require('../validators/commandeValidator');
const commandeService = require('../services/commandeService');

const commandeController = {
  async list(req, res) {
    const rows = await commandeService.list(req.user.id, req.user.role);
    return res.status(200).json(rows);
  },
  async getById(req, res) {
    const row = await commandeService.getById(parseInt(req.params.id, 10), req.user.id, req.user.role);
    if (row === 'forbidden') return res.status(403).json({ message: 'Forbidden' });
    if (!row) return res.status(404).json({ message: 'Commande not found' });
    return res.status(200).json(row);
  },
  async create(req, res) {
    const { error } = createCommandeSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
      const created = await commandeService.createFromItems(req.user.id, req.body.items);
      return res.status(201).json(created);
    } catch (err) {
      const status = err.status || 500;
      return res.status(status).json({ message: err.message || 'Server error' });
    }
  },
  async updateStatus(req, res) {
    const { error } = updateCommandeStatusSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const updated = await commandeService.updateStatus(parseInt(req.params.id, 10), req.body.statut, req.user.id, req.user.role);
    if (updated === 'forbidden') return res.status(403).json({ message: 'Forbidden' });
    if (!updated) return res.status(404).json({ message: 'Commande not found' });
    return res.status(200).json(updated);
  },
  async remove(req, res) {
    const result = await commandeService.remove(parseInt(req.params.id, 10), req.user.id, req.user.role);
    if (result === 'forbidden') return res.status(403).json({ message: 'Forbidden' });
    if (!result) return res.status(404).json({ message: 'Commande not found' });
    return res.status(204).send();
  }
};

module.exports = commandeController;

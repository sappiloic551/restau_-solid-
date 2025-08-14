const { createCategorieSchema, updateCategorieSchema } = require('../validators/categorieValidator');
const categorieService = require('../services/categorieService');

const categorieController = {
  async create(req, res) {
    const { error } = createCategorieSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const created = await categorieService.create(req.body);
    return res.status(201).json(created);
  },
  async list(req, res) {
    const rows = await categorieService.list();
    return res.status(200).json(rows);
  },
  async getById(req, res) {
    const row = await categorieService.getById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Categorie not found' });
    return res.status(200).json(row);
  },
  async update(req, res) {
    const { error } = updateCategorieSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const row = await categorieService.update(req.params.id, req.body);
    if (!row) return res.status(404).json({ message: 'Categorie not found' });
    return res.status(200).json(row);
  },
  async remove(req, res) {
    const deleted = await categorieService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Categorie not found' });
    return res.status(204).send();
  },
};

module.exports = categorieController;

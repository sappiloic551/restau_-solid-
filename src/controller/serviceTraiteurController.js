const ServiceTraiteur = require('../models/ServiceTraiteur');

module.exports = {
  // Create a new service traiteur request
  async createService(req, res) {
    try {
      const {
        date_evenement,
        heure_evenement,
        type_service,
        lieu,
        exigences,
        statut,
        nombre_convives,
        id_utilisateur,
      } = req.body;

      const newService = await ServiceTraiteur.create({
        date_evenement,
        heure_evenement,
        type_service,
        lieu,
        exigences,
        statut: statut || 'pending',  // default if not provided
        nombre_convives,
        id_utilisateur,
      });

      res.status(201).json(newService);
    } catch (err) {
      res.status(500).json({ message: 'Error creating service traiteur', error: err.message });
    }
  },

  // Get all services
  async getAllServices(req, res) {
    try {
      const services = await ServiceTraiteur.findAll();
      res.json(services);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching services', error: err.message });
    }
  },

  // Get service by ID
  async getServiceById(req, res) {
    try {
      const id = req.params.id;
      const service = await ServiceTraiteur.findByPk(id);
      if (!service) return res.status(404).json({ message: 'Service traiteur not found' });
      res.json(service);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching service', error: err.message });
    }
  },

  // Update service by ID
  async updateService(req, res) {
    try {
      const id = req.params.id;
      const service = await ServiceTraiteur.findByPk(id);
      if (!service) return res.status(404).json({ message: 'Service traiteur not found' });

      const {
        date_evenement,
        heure_evenement,
        type_service,
        lieu,
        exigences,
        statut,
        nombre_convives,
        id_utilisateur,
      } = req.body;

      service.date_evenement = date_evenement || service.date_evenement;
      service.heure_evenement = heure_evenement || service.heure_evenement;
      service.type_service = type_service || service.type_service;
      service.lieu = lieu || service.lieu;
      service.exigences = exigences || service.exigences;
      service.statut = statut || service.statut;
      service.nombre_convives = nombre_convives || service.nombre_convives;
      service.id_utilisateur = id_utilisateur || service.id_utilisateur;

      await service.save();

      res.json({ message: 'Service traiteur updated', service });
    } catch (err) {
      res.status(500).json({ message: 'Error updating service traiteur', error: err.message });
    }
  },

  // Delete service by ID
  async deleteService(req, res) {
    try {
      const id = req.params.id;
      const deleted = await ServiceTraiteur.destroy({ where: { id_service: id } });
      if (!deleted) return res.status(404).json({ message: 'Service traiteur not found' });
      res.json({ message: 'Service traiteur deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting service traiteur', error: err.message });
    }
  }
};

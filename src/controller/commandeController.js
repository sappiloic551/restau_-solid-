const Commande = require('../models/Commande');

module.exports = {

 
    async createCommande(req, res) {
        try {
          
            const { date_commande, heure_commande, status, montant, id_utilisateur } = req.body;

            const newCommande = await Commande.create({
                date_commande,
                heure_commande,
                status,
                montant,
                id_utilisateur
            });

        
            res.status(201).json(newCommande);

        } catch (err) {
         
            res.status(500).json({ message: 'Error creating commande', error: err.message });
        }
    },

   
    async getAllCommandes(req, res) {
        try {
            const commandes = await Commande.findAll();
            res.json(commandes);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching commandes', error: err.message });
        }
    },

    // Get a single commande by its ID
    async getCommandeById(req, res) {
        try {
            const id = req.params.id;
            const commande = await Commande.findByPk(id);

            if (!commande) return res.status(404).json({ message: 'Commande not found' });

            res.json(commande);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching commande', error: err.message });
        }
    },

    // Update a commande by ID
    async updateCommande(req, res) {
        try {
            const id = req.params.id;
            const commande = await Commande.findByPk(id);

            if (!commande) return res.status(404).json({ message: 'Commande not found' });

            // Update fields - only update if new value provided, else keep old
            const { date_commande, heure_commande, status, montant, id_utilisateur } = req.body;

            commande.date_commande = date_commande || commande.date_commande;
            commande.heure_commande = heure_commande || commande.heure_commande;
            commande.status = status || commande.status;
            commande.montant = montant || commande.montant;
            commande.id_utilisateur = id_utilisateur || commande.id_utilisateur;

            // Save updated commande
            await commande.save();

            res.json({ message: 'Commande updated', commande });

        } catch (err) {
            res.status(500).json({ message: 'Error updating commande', error: err.message });
        }
    },

    // Delete a commande by ID
    async deleteCommande(req, res) {
        try {
            const id = req.params.id;
            const deleted = await Commande.destroy({ where: { id_commande: id } });

            if (!deleted) return res.status(404).json({ message: 'Commande not found' });

            res.json({ message: 'Commande deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting commande', error: err.message });
        }
    }
};

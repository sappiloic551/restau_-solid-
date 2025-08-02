const Paiement = require('../models/Paiement');

module.exports = {

    // Create a new payment record
    async createPaiement(req, res) {
        try {
            // Destructure required fields from request body
            const { date_paiement, montant_paiement, type_paiement, status, id_utilisateur, lieu, lheure } = req.body;

            // Create a new paiement record
            const newPaiement = await Paiement.create({
                date_paiement,
                montant_paiement,
                type_paiement,
                status,
                id_utilisateur,
                lieu,
                lheure
            });

            res.status(201).json(newPaiement);

        } catch (err) {
            res.status(500).json({ message: 'Error creating paiement', error: err.message });
        }
    },

    // Get all payments
    async getAllPaiements(req, res) {
        try {
            const paiements = await Paiement.findAll();
            res.json(paiements);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching paiements', error: err.message });
        }
    },

    // Get payment by id
    async getPaiementById(req, res) {
        try {
            const id = req.params.id;
            const paiement = await Paiement.findByPk(id);
            if (!paiement) return res.status(404).json({ message: 'Paiement not found' });
            res.json(paiement);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching paiement', error: err.message });
        }
    },

    // Update payment by id
    async updatePaiement(req, res) {
        try {
            const id = req.params.id;
            const paiement = await Paiement.findByPk(id);
            if (!paiement) return res.status(404).json({ message: 'Paiement not found' });

            // Destructure fields, update only those provided
            const { date_paiement, montant_paiement, type_paiement, status, id_utilisateur, lieu, lheure } = req.body;

            paiement.date_paiement = date_paiement || paiement.date_paiement;
            paiement.montant_paiement = montant_paiement || paiement.montant_paiement;
            paiement.type_paiement = type_paiement || paiement.type_paiement;
            paiement.status = status || paiement.status;
            paiement.id_utilisateur = id_utilisateur || paiement.id_utilisateur;
            paiement.lieu = lieu || paiement.lieu;
            paiement.lheure = lheure || paiement.lheure;

            await paiement.save();

            res.json({ message: 'Paiement updated', paiement });

        } catch (err) {
            res.status(500).json({ message: 'Error updating paiement', error: err.message });
        }
    },

    // Delete payment by id
    async deletePaiement(req, res) {
        try {
            const id = req.params.id;
            const deleted = await Paiement.destroy({ where: { id_paiement: id } });
            if (!deleted) return res.status(404).json({ message: 'Paiement not found' });

            res.json({ message: 'Paiement deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting paiement', error: err.message });
        }
    }
};

const Reservation = require('../models/Reservation');

module.exports = {
  // Create a new reservation
  async createReservation(req, res) {
    try {
      const {
        date_res,
        heure_res,
        status_res,
        nombre_pers,
        id_utilisateur,
        id_paiement,
        telephone,
        message,
      } = req.body;

      const newReservation = await Reservation.create({
        date_res,
        heure_res,
        status_res,
        nombre_pers,
        id_utilisateur,
        id_paiement,
        telephone,
        message,
      });

      res.status(201).json(newReservation);
    } catch (err) {
      res.status(500).json({ message: 'Error creating reservation', error: err.message });
    }
  },

  // Get all reservations
  async getAllReservations(req, res) {
    try {
      const reservations = await Reservation.findAll();
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reservations', error: err.message });
    }
  },

  // Get reservation by ID
  async getReservationById(req, res) {
    try {
      const id = req.params.id;
      const reservation = await Reservation.findByPk(id);
      if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
      res.json(reservation);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching reservation', error: err.message });
    }
  },

  // Update reservation by ID
  async updateReservation(req, res) {
    try {
      const id = req.params.id;
      const reservation = await Reservation.findByPk(id);
      if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

      // Destructure incoming data and update only provided fields
      const {
        date_res,
        heure_res,
        status_res,
        nombre_pers,
        id_utilisateur,
        id_paiement,
        telephone,
        message,
      } = req.body;

      reservation.date_res = date_res || reservation.date_res;
      reservation.heure_res = heure_res || reservation.heure_res;
      reservation.status_res = status_res || reservation.status_res;
      reservation.nombre_pers = nombre_pers || reservation.nombre_pers;
      reservation.id_utilisateur = id_utilisateur || reservation.id_utilisateur;
      reservation.id_paiement = id_paiement || reservation.id_paiement;
      reservation.telephone = telephone || reservation.telephone;
      reservation.message = message || reservation.message;

      await reservation.save();

      res.json({ message: 'Reservation updated', reservation });
    } catch (err) {
      res.status(500).json({ message: 'Error updating reservation', error: err.message });
    }
  },

  // Delete reservation by ID
  async deleteReservation(req, res) {
    try {
      const id = req.params.id;
      const deleted = await Reservation.destroy({ where: { id_reservation: id } });
      if (!deleted) return res.status(404).json({ message: 'Reservation not found' });

      res.json({ message: 'Reservation deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting reservation', error: err.message });
    }
  }
};

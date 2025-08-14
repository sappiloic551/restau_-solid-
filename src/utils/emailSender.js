const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuration du transporteur Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true pour le port 465, false pour les autres ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    // Évite les problèmes de certificat auto-signé en développement
    rejectUnauthorized: false
  }
});

// Vérification de la connexion SMTP au démarrage (optionnel mais utile)
transporter.verify((error) => {
  if (error) {
    console.error('Erreur de configuration SMTP:', error);
  } else {
    console.log('Serveur SMTP configuré avec succès');
  }
});

/**
 * Envoie un code de vérification par email
 * @param {string} email - Email du destinataire
 * @param {string} code - Code de vérification
 * @returns {Promise} Promise représentant l'envoi de l'email
 */
const sendVerificationCode = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@votredomaine.com', // Fallback si non configuré
    to: email,
    subject: 'Code de réinitialisation de mot de passe',
    text: `Votre code de réinitialisation est : ${code}\nIl expirera dans 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Réinitialisation de mot de passe</h2>
        <p>Votre code de vérification est :</p>
        <div style="background: #f3f4f6; padding: 16px; text-align: center; font-size: 24px; letter-spacing: 2px; margin: 16px 0;">
          <strong>${code}</strong>
        </div>
        <p>Ce code expirera dans 5 minutes.</p>
        <p style="font-size: 12px; color: #6b7280;">Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error("Échec de l'envoi de l'email de vérification");
  }
};

module.exports = sendVerificationCode;
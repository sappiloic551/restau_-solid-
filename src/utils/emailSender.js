const nodemailer = require ('nodemailer');
require ('dotenv').config();

//use gmail or switch to MailDev for local testing
const transporter = nodemailer.createTransport ({

  service: 'gmail',
  auth : {
    user: process.env.Email_USER,
    pass: process.env.Email_PASS,
  }
});

//send email with 5-digit verification code
/**
 * Sends verification code to user's email
 * @param {string} email - user's email
 * @param {string} code - verification code
 */

const sendVerificationCode = async (email, code) => {
  const mailOptions = {
    from: process.env.Email_USER,
    to: email,
    subject: 'Password reset code',
    text: `Your reset code is: ${code}. It expires in 5 minutes.`
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendVerificationCode;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.example.com',
  port: 465,
  secure: true,
  auth: {
    user: 'contact@example.com',
    pass: 'password'
  }
});

module.exports = transporter;



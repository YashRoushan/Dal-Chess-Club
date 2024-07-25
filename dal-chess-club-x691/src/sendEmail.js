const nodemailer = require('nodemailer');

// Configure the transporter with your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: 'chessclubdal@gmail.com',
    pass: 'chessclubtest'
  }
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'chessclubdal@gmail.com',
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;

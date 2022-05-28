var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hsadmissionmanagement@gmail.com',
    pass: 'urtaontzllcmwsxw'
  }
});


module.exports = transporter;
const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  	service: 'gmail',
  	auth: {
    	user: 'yacinelaakel@gmail.com',
    	pass: 'Ticotico1995*'
  	}
});

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport(options[, defaults]);

// takes in the email address and message to be sent then sends the email
sendEmail = function (email, msg) {

}

module.exports = {sendEmail};
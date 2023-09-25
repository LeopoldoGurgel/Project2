// can only send 30 emails per day
const nodemailer = require('nodemailer');
// emailer tool
// https://nodemailer.com/about/
// smtp server
// https://app.brevo.com/
"use strict";

// making the transporter for the email
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: 'maxwalent@rogers.com',
    pass: 'SF4RLdWEDMcfa15X'
  }
});

// takes in a recieving address, a suject, and a message
async function sendEmail(email, subject, msg) {
  // send mail with defined transport object
  console.log('Going to send mail')
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <maxwalent@rogers.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: msg, // plain text body
    html: `<b>${msg}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

// sendEmail(email, 'A subject', 'Your free spam email').catch(console.error);

module.exports = sendEmail;
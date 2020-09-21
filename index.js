require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO,
  subject: process.env.EMAIL_SUBJECT,
  html: '<p>' + process.argv[1] + '</p>'
}

transporter.sendMail(mailOptions, function (err, info) {
  console.log(mailOptions)
  if(err)
    console.log(err)
  else
    console.log(info)
})
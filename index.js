require('dotenv').config()
const nodemailer = require('nodemailer')
const fs = require('fs')

if (!process.env.EMAIL_USERNAME) {
  throw ReferenceError('You must define a EMAIL_USERNAME in the .env file')
}

if (!process.env.EMAIL_PASSWORD) {
  throw ReferenceError('You must define a EMAIL_PASSWORD in the .env file')
}

if (!process.env.EMAIL_TO) {
  throw ReferenceError('You must define a EMAIL_TO in the .env file')
}

if (!process.env.EMAIL_FROM) {
  throw ReferenceError('You must define a EMAIL_FROM in the .env file')
}

if (!process.env.EMAIL_SUBJECT) {
  throw ReferenceError('You must define a EMAIL_SUBJECT in the .env file')
}

if (!process.argv[2]) {
  throw ReferenceError('You must specify an html file')
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
})

const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO,
  subject: process.env.EMAIL_SUBJECT
}

fs.readFile('./' + process.argv[2], function (err, data) {
  if (err) {
    console.log(err)
  } else {
    mailOptions.html = data.toString()

    transporter.sendMail(mailOptions, function (err, info) {
      console.log(mailOptions)
      if(err)
        console.log(err)
      else
        console.log(info)
    })
  }
})

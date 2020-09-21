require('dotenv').config()
const nodemailer = require('nodemailer')
const { parse } = require('node-html-parser')
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
    const html = parse(data.toString())
    const attachments = []

    html.querySelectorAll('img').forEach((elem, index) => {
      const src = elem.getAttribute('src').split('/')
      elem.setAttribute('src', 'cid:img' + index)
      attachments.push({
        filename: src[src.length - 1],
        path: src.slice(0, src.length).join('/'),
        cid: 'img' + index
      })
    })

    mailOptions.html = html.toString()
    mailOptions.attachments = attachments

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })
  }
})

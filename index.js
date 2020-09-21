#!/usr/bin/env node

require('dotenv').config({ path: __dirname + '/.env' })
const nodemailer = require('nodemailer')
const { parse } = require('node-html-parser')
const fs = require('fs')
const axios = require('axios')

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
  host: process.env.EMAIL_HOST,
  secure: process.env.EMAIL_SECURE ? true : false,
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

fs.readFile('./' + process.argv[2], async function (err, data) {
  if (err) {
    console.log(err)
  } else {
    const html = parse(data.toString())
    const attachments = []


    for (const elem of html.querySelectorAll('img')) {
      try {
        await axios.head(elem.getAttribute('src'))
      } catch {
        const src = elem.getAttribute('src')
        elem.setAttribute('src', 'cid:img' + attachments.length)
        attachments.push({
          filename: src.split('/')[src.length - 1],
          path: src,
          cid: 'img' + attachments.length
        })
      }
    }

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

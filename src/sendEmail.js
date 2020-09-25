const nodemailer = require('nodemailer')
const { parse } = require('node-html-parser')
const fs = require('fs')
const axios = require('axios')
const path = require('path')

function sendEmail (obj) {
  const transporter = nodemailer.createTransport({
    host: obj.emailHost,
    secure: obj.emailSecure,
    auth: {
      user: obj.emailUsername,
      pass: obj.emailPassword
    }
  })
  
  const mailOptions = {
    from: obj.emailFrom,
    to: obj.emailTo,
    subject: obj.emailSubject
  }
  
  fs.readFile(path.resolve(obj.htmlFile), async function (err, data) {
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
            path: path.resolve(obj.htmlFile.split('/').slice(0, obj.htmlFile.split('/').length - 1).join('/'), src),
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
  
}

module.exports = sendEmail

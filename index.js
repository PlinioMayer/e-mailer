#!/usr/bin/env node
const fs = require('fs')
const sendEmail = require('./src/sendEmail')
const {
  clearLines,
  getEmailHost,
  getEmailUsername,
  getEmailSecure,
  getEmailPassword,
  getSaveEmailPassword,
  getDefaultEmailFrom,
  getDefaultEmailTo,
  getDefaultEmailSubject
} = require('./src/consoleReaders')

async function init () {
  const configObj = {}
  configObj.emailHost = await getEmailHost()
  configObj.emailUsername = await getEmailUsername()
  configObj.emailSecure = await getEmailSecure()
  
  const password = getSaveEmailPassword()

  if (password) {
    configObj.emailPassword = password
  }

  const from = await getDefaultEmailFrom()

  if (from) {
    configObj.emailFrom = from
  }

  const to = await getDefaultEmailTo()

  if (to) {
    configObj.emailTo = to
  }

  const sub = await getDefaultEmailSubject()

  if (sub) {
    configObj.emailSubject = sub
  }

  fs.writeFile(__dirname + '/config.json', JSON.stringify(configObj), () => {
    console.log('E-mailer configured succesfully')
  })
}

if (process.argv[2] == '--init') {
  init()
} else {
  fs.readFile(__dirname + '/config.json', async (err, data) => {
    if (err) {
      console.log('You must initiate e-mailer before using it')
      console.log('\nRun e-mailer --init')
    } else {
      const configs = JSON.parse(data)

      const args = {}
      let flagsCount = 0

      args.toFlagIndex = process.argv.indexOf('--to')
      args.toContent = process.argv[process.argv.indexOf('--to') + 1]

      if (args.toFlagIndex < 0 || !args.toContent) {
        if (!configs.emailTo) {
          console.log('You must pass a email to be sent to.')
          console.log('Use the \'--to\' flag to do so.')
          return
        }
      } else {
        flagsCount++
        configs.emailTo = args.toContent
      }

      args.fromFlagIndex = process.argv.indexOf('--from')
      args.fromContent = process.argv[process.argv.indexOf('--from') + 1]

      if (args.fromFlagIndex < 0 || !args.fromContent) {
        if (!configs.emailFrom) {
          configs.emailFrom = configs.emailUsername
        }
      } else {
        flagsCount++
        configs.emailFrom = args.fromContent
      }

      args.subjectFlagIndex = process.argv.indexOf('--sub')
      args.subjectContent = process.argv[process.argv.indexOf('--sub') + 1]

      if (args.subjectFlagIndex < 0 || !args.subjectContent) {
        if (!configs.emailSubject) {
          console.log('You must pass a subject for the email.')
          console.log('Use the \'--sub\' flag to do so.')
          return
        }
      } else {
        flagsCount++
        configs.emailSubject = args.subjectContent
      }

      const argsArr = [args.toFlagIndex, args.fromFlagIndex, args.subjectFlagIndex].filter(elem => elem !== -1).sort((a, b) => b - a)

      if (process.argv.length < (3 + (2 * flagsCount))) {
        console.log('You must specify an html htmlFile.')
        return
      }

      if (!argsArr.length) {
        configs.htmlFile = process.argv[2]
      } else {
        argsArr.slice(0, argsArr.length - 1).forEach((elem, index) => {
          if (argsArr[index] - argsArr[index + 1] > 2) {
            configs.htmlFile = process.argv[argsArr[index + 1] + 2]
          }
        })
  
        if (!configs.htmlFile) {
          if (process.argv[argsArr[0] + 2]) {
            configs.htmlFile = process.argv[argsArr[0] + 2]
          } else {
            configs.htmlFile = process.argv[2]
          }
        }
      }

      if (!configs.emailPassword) {
        configs.emailPassword = getEmailPassword()
        clearLines(1)
      }

      sendEmail(configs)
    }
  })
}

#!/usr/bin/env node

const fs = require('fs')
const readlineSync = require('readline-sync')
const sendEmail = require('./src/sendEmail')
const readline = require('readline')

function clearConsole () {
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
} 

function getEmailUsername () {
  clearConsole()
  let username = readlineSync.question('Email username: ')

  while (!username) {
    clearConsole()
    console.log('Email username can\'t be blank')
    username = readlineSync.question('Email username: ')
  }

  return username
}

function getEmailPassword () {
  clearConsole()
  let password = readlineSync.question('Email password: ', {
    hideEchoBack: true
  })

  while (!password) {
    clearConsole()
    console.log('Email password can\'t be blank')
    password = readlineSync.question('Email password: ', {
      hideEchoBack: true
    })
  }

  return password
}

function getEmailHost () {
  clearConsole()
  let host = readlineSync.question('Email host (default: smtp.gmail.com): ')

  return host ? host : 'smtp.gmail.com'
}

function getEmailSecure () {
  clearConsole()
  let secure = readlineSync.question('Email uses TLS (y/n) (default: n): ')

  while ((secure !== 'y' || secure !== 'Y') && secure && (secure !== 'n' || secure !== 'N')) {
    clearConsole()
    console.log('Use \'y\' or \'n\', default \'n\'')
    secure = readlineSync.question('Email uses TLS (y/n) (default: n): ')
  }

  return secure ? (secure === 'y' || secure === 'Y' ? true : false) : false
}

if (process.argv[2] == '--init') {
  const configObj = {}

  configObj.emailHost = getEmailHost()
  configObj.emailUsername = getEmailUsername()
  configObj.emailSecure = getEmailSecure()

  fs.writeFile(__dirname + '/config.json', JSON.stringify(configObj), () => {
    clearConsole()
    console.log('E-mailer configured succesfully')
  })
} else {
  fs.readFile(__dirname + '/config.json', (err, data) => {
    if (err) {
      console.log('You must initiate e-mailer before using it')
      console.log('\nRun e-mailer --init')
    } else {
      const args = {}
      args.toFlagIndex = process.argv.indexOf('--to')
      args.toContent = process.argv[process.argv.indexOf('--to') + 1]

      if (args.toFlagIndex < 0 || !args.toContent) {
        console.log('You must pass a email to be sent to.')
        console.log('Use the \'--to\' flag to do so.')
        return
      }

      args.fromFlagIndex = process.argv.indexOf('--from')
      args.fromContent = process.argv[process.argv.indexOf('--from') + 1]

      if (args.fromFlagIndex < 0 || !args.fromContent) {
        console.log('You must pass a email to be sent from.')
        console.log('Use the \'--from\' flag to do so.')
        return
      }

      args.subjectFlagIndex = process.argv.indexOf('--sub')
      args.subjectContent = process.argv[process.argv.indexOf('--sub') + 1]

      if (args.subjectFlagIndex < 0 || !args.subjectContent) {
        console.log('You must pass a subject for the email.')
        console.log('Use the \'--sub\' flag to do so.')
        return
      }

      const argsArr = [args.toFlagIndex, args.fromFlagIndex, args.subjectFlagIndex].sort((a, b) => b - a)

      if (process.argv.length < 9) {
        console.log('You must specify an html htmlFile.')
        return
      }

      if (argsArr[0] - argsArr[1] > 2) {
        args.htmlFile = process.argv[argsArr[1] + 2]
      } else if (argsArr[1] - argsArr[2] > 2) {
        args.htmlFile = process.argv[argsArr[2] + 2]
      } else {
        if (process.argv[argsArr[0] + 2]) {
          args.htmlFile = process.argv[argsArr[0] + 2]
        } else {
          args.htmlFile = process.argv[2]
        }
      }

      const obj = {
        ...JSON.parse(data),
        emailTo: args.toContent,
        emailFrom: args.fromContent,
        emailSubject: args.subjectContent,
        emailPassword: getEmailPassword(),
        htmlFile: args.htmlFile
      }

      clearConsole()

      sendEmail(obj)
    }
  })
}

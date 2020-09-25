#!/usr/bin/env node

const fs = require('fs')
const readlineSync = require('readline-sync')
const sendEmail = require('./src/sendEmail')

function getEmailUsername () {
  let username = readlineSync.question('Email username: ')

  while (!username) {
    console.clear()
    console.log('Email username can\'t be blank')
    username = readlineSync.question('Email username: ')
  }

  return username
}

function getEmailPassword () {
  let password = readlineSync.question('Email password: ', {
    hideEchoBack: true
  })

  while (!password) {
    console.clear()
    console.log('Email password can\'t be blank')
    password = readlineSync.question('Email password: ', {
      hideEchoBack: true
    })
  }

  console.clear()

  let confirmPassword = readlineSync.question('Confirm email password: ', {
    hideEchoBack: true
  })

  while (!confirmPassword || confirmPassword !== password) {
    if (!confirmPassword) {
      console.clear()
      console.log('Email password confirmation can\'t be blank')
      confirmPassword = readlineSync.question('Confirm email password: ', {
        hideEchoBack: true
      })
    } else {
      console.clear()
      console.log('Email password confirmation doesn\'t match password')
      confirmPassword = readlineSync.question('Confirm email password: ', {
        hideEchoBack: true
      })
    }
  }

  return password
}

function getEmailHost () {
  let host = readlineSync.question('Email host (default: smtp.gmail.com): ')

  return host ? host : 'smtp.gmail.com'
}

if (process.argv[2] == '--init') {
  const configObj = {}

  configObj.emailUsername = getEmailUsername()
  console.clear()
  configObj.emailPassword = getEmailPassword()
  console.clear()
  configObj.emailHost = getEmailHost()

  fs.writeFile('./config.json', JSON.stringify(configObj), () => {
    console.clear()
    console.log('E-mailer configured succesfully')
  })
} else {
  fs.readFile('./config.json', (err, data) => {
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

      console.log(argsArr)

      if (argsArr[0] - argsArr[1] > 2) {
        args.htmlFile = process.argv[argsArr[1] + 2]
      } else if (argsArr[1] - argsArr[2] > 2) {
        args.htmlFile = process.argv[argsArr[2] + 2]
      } else {
        args.htmlFile = process.argv[argsArr[0] + 2]
      }

      if (!args.htmlFile) {
        console.log('You must specify an html htmlFile.')
        return
      }

      const obj = {
        ...JSON.parse(data),
        emailTo: args.toContent,
        emailFrom: args.fromContent,
        emailSubject: args.subjectContent,
        htmlFile: args.htmlFile
      }

      sendEmail(obj)
    }
  })
}

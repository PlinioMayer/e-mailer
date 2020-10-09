const readlineSync = require('readline-sync')
const readline = require('readline')

function clearConsole () {
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

module.exports = {
  clearConsole,
  getEmailUsername () {
    clearConsole()
    let username = readlineSync.question('Email username: ')
  
    while (!username) {
      clearConsole()
      console.log('Email username can\'t be blank')
      username = readlineSync.question('Email username: ')
    }
  
    return username
  },
  getEmailPassword () {
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
  },
  getEmailHost () {
    clearConsole()
    let host = readlineSync.question('Email host (default: smtp.gmail.com): ')
  
    return host ? host : 'smtp.gmail.com'
  },
  getEmailSecure () {
    clearConsole()
    let secure = readlineSync.question('Email uses TLS (y/n) (default: n): ')
  
    while ((secure !== 'y' || secure !== 'Y') && secure !== '' && (secure !== 'n' || secure !== 'N')) {
      clearConsole()
      console.log('Use \'y\' or \'n\', default \'n\'')
      secure = readlineSync.question('Email uses TLS (y/n) (default: n): ')
    }
  
    return secure ? (secure === 'y' || secure === 'Y' ? true : false) : false
  },
  getSaveEmailPassword () {
    clearConsole()
    console.log('You can save your password so you won\'t need to type every time you send an email.')
    console.log('The password will be saved directly in the config.json file. Use at your own risk.')
    console.log('Leave blank to skip.\n')

    let password = readlineSync.question('Email password: ', {
      hideEchoBack: true
    })
  
    if (!password) {
      return false
    }
  
    clearConsole()
    let confirmPassword = readlineSync.question('Repeat email password: ', {
      hideEchoBack: true
    })
    
    while (confirmPassword !== password) {
      clearConsole()
      console.log('Password confirmation doesn\'t match password')
      confirmPassword = readlineSync.question('Repeat email password: ', {
        hideEchoBack: true
      })
    }
  
    return password
  },
  getDefaultEmailFrom () {
    clearConsole()
    console.log('You can save a default email to be used as sender.')
    console.log('You can override this passing the flag \'--from\'.')
    console.log('If no default sender is configured and no \'--from\' flag is passed, the email username will be used.')
    console.log('Leave blank to skip.\n')
    let from = readlineSync.question('Default email \'from\': ')
  
    return from ? from : false
  },
  getDefaultEmailTo () {
    clearConsole()
    console.log('You can save a default email to be used as receiver.')
    console.log('You can override this passing the flag \'--to\'.')
    console.log('If you don\'t specify a default receiver and don\'t pass a \'--to\' flag, an error will be thrown.')
    console.log('Leave blank to skip.\n')
    let to = readlineSync.question('Default email \'to\': ')
  
    return to ? to : false
  },
  getDefaultEmailSubject () {
    clearConsole()
    console.log('You can save a default email subject.')
    console.log('You can override this passing the flag \'--sub\'.')
    console.log('If you don\'t specify a default subject and don\'t pass a \'--sub\' flag, an error will be thrown.')
    console.log('Leave blank to skip.\n')
    let sub = readlineSync.question('Default email subject: ')
  
    return sub ? sub : false
  }
}

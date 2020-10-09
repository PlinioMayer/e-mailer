const readlineSync = require('readline-sync')
const readline = require('readline')
const preadline = require('./preadline')

function clearLines (n) {
  readline.moveCursor(process.stdout, 0, -1 * n)
  readline.clearScreenDown(process.stdout)
}

module.exports = {
  clearLines,
  async getEmailUsername () {
    let username = await preadline('Email username: ')
    clearLines(1)
  
    while (!username) {
      console.log('Email username can\'t be blank')
      username = await preadline('Email username: ')
      clearLines(2)
    }
  
    return username
  },
  async getEmailPassword () {
    let password = await preadline('Email password: ', {
      hideEchoBack: true
    })
    clearLines(1)
  
    while (!password) {
      console.log('Email password can\'t be blank')
      password = await preadline('Email password: ', {
        hideEchoBack: true
      })
      clearLines(2)
    }
  
    return password
  },
  async getEmailHost () {
    let host = await preadline('Email host (default: smtp.gmail.com): ')
    clearLines(1)
  
    return host ? host : 'smtp.gmail.com'
  },
  async getEmailSecure () {
    let secure = await preadline('Email uses TLS (y/n) (default: n): ')
    clearLines(1)
  
    while (secure !== 'y' && secure !== 'Y' && secure !== '' && secure !== 'n' && secure !== 'N') {
      console.log('Use \'y\' or \'n\', default \'n\'')
      secure = await preadline('Email uses TLS (y/n) (default: n): ')
      clearLines(2)
    }
  
    return secure ? (secure === 'y' || secure === 'Y' ? true : false) : false
  },
  getSaveEmailPassword () {
    console.log('You can save your password so you won\'t need to type every time you send an email.')
    console.log('The password will be saved directly in the config.json file. Use at your own risk.')
    console.log('Leave blank to skip.\n')

    let password = readlineSync.question('Email password: ', {
      hideEchoBack: true
    })
    clearLines(5)
  
    if (!password) {
      return false
    }
  
    let confirmPassword = readlineSync.question('Repeat email password: ', {
      hideEchoBack: true
    })
    clearLines(1)
    
    while (confirmPassword !== password) {
      console.log('Password confirmation doesn\'t match password')
      confirmPassword = readlineSync.question('Repeat email password: ', {
        hideEchoBack: true
      })
      clearLines(2)
    }
  
    return password
  },
  async getDefaultEmailFrom () {
    console.log('You can save a default email to be used as sender.')
    console.log('You can override this passing the flag \'--from\'.')
    console.log('If no default sender is configured and no \'--from\' flag is passed, the email username will be used.')
    console.log('Leave blank to skip.\n')
    let from = await preadline('Default email \'from\': ')
    clearLines(6)
  
    return from ? from : false
  },
  async getDefaultEmailTo () {
    console.log('You can save a default email to be used as receiver.')
    console.log('You can override this passing the flag \'--to\'.')
    console.log('If you don\'t specify a default receiver and don\'t pass a \'--to\' flag, an error will be thrown.')
    console.log('Leave blank to skip.\n')
    let to = await preadline('Default email \'to\': ')
    clearLines(6)
  
    return to ? to : false
  },
  async getDefaultEmailSubject () {
    console.log('You can save a default email subject.')
    console.log('You can override this passing the flag \'--sub\'.')
    console.log('If you don\'t specify a default subject and don\'t pass a \'--sub\' flag, an error will be thrown.')
    console.log('Leave blank to skip.\n')
    let sub = await preadline('Default email subject: ')
    clearLines(6)
  
    return sub ? sub : false
  }
}

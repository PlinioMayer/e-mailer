const readlineSync = require('readline-sync')
const readline = require('readline')
const preadline = require('./preadline')

function clearLines (n) {
  readline.moveCursor(process.stdout, 0, -1 * n)
  readline.clearScreenDown(process.stdout)
}

module.exports = {
  clearLines,
  getEmailUsername () {
    let username = readlineSync.question('Email username: ')
    clearLines(1)
  
    while (!username) {
      console.log('Email username can\'t be blank')
      username = readlineSync.question('Email username: ')
      clearLines(2)
    }
  
    return username
  },
  getEmailPassword () {
    let password = readlineSync.question('Email password: ', {
      hideEchoBack: true
    })
    clearLines(1)
  
    while (!password) {
      console.log('Email password can\'t be blank')
      password = readlineSync.question('Email password: ', {
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
  getEmailSecure () {
    let secure = readlineSync.question('Email uses TLS (y/n) (default: n): ')
    clearLines(1)
  
    while ((secure !== 'y' || secure !== 'Y') && secure !== '' && (secure !== 'n' || secure !== 'N')) {
      console.log('Use \'y\' or \'n\', default \'n\'')
      secure = readlineSync.question('Email uses TLS (y/n) (default: n): ')
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
  getDefaultEmailFrom () {
    console.log('You can save a default email to be used as sender.')
    console.log('You can override this passing the flag \'--from\'.')
    console.log('If no default sender is configured and no \'--from\' flag is passed, the email username will be used.')
    console.log('Leave blank to skip.\n')
    let from = readlineSync.question('Default email \'from\': ')
    clearLines(6)
  
    return from ? from : false
  },
  getDefaultEmailTo () {
    console.log('You can save a default email to be used as receiver.')
    console.log('You can override this passing the flag \'--to\'.')
    console.log('If you don\'t specify a default receiver and don\'t pass a \'--to\' flag, an error will be thrown.')
    console.log('Leave blank to skip.\n')
    let to = readlineSync.question('Default email \'to\': ')
    clearLines(6)
  
    return to ? to : false
  },
  getDefaultEmailSubject () {
    console.log('You can save a default email subject.')
    console.log('You can override this passing the flag \'--sub\'.')
    console.log('If you don\'t specify a default subject and don\'t pass a \'--sub\' flag, an error will be thrown.')
    console.log('Leave blank to skip.\n')
    let sub = readlineSync.question('Default email subject: ')
    clearLines(6)
  
    return sub ? sub : false
  },
  async getAutoUpdate () {
    let autoUpdate = await preadline('Would you like to test for updates at start? (y/n) (default: n): ')
    clearLines(1)
  
    while ((autoUpdate !== 'y' || autoUpdate !== 'Y') && autoUpdate !== '' && (autoUpdate !== 'n' || autoUpdate !== 'N')) {
      console.log('Use \'y\' or \'n\', default \'n\'')
      autoUpdate = await preadline('Would you like to test for updates at start? (y/n) (default: n): ')
      clearLines(2)
      console.log((autoUpdate !== 'y' || autoUpdate !== 'Y') && autoUpdate !== '' && (autoUpdate !== 'n' || autoUpdate !== 'N'))
    }
  
    return autoUpdate ? (autoUpdate === 'y' || autoUpdate === 'Y' ? true : false) : false
  },
  getUpdate (installedVersion, currentVersion) {
    console.log('Your version is', installedVersion, 'and the current verison is', currentVersion)
    let update = readlineSync.question('Would you like to update? (y/n) (default: n): ')
    clearLines(2)
  
    while ((update !== 'y' || update !== 'Y') && update !== '' && (update !== 'n' || update !== 'N')) {
      console.log('Use \'y\' or \'n\', default \'n\'')
      update = readlineSync.question('Would you like to update? (y/n) (default: n): ')
      clearLines(2)
    }
  
    return update ? (update === 'y' || update === 'Y' ? true : false) : false
  }
}

const readline = require('readline')

module.exports = function (question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer)
      rl.close()
    })
  })
}

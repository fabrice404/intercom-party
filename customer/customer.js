const fs = require('fs')
const readline = require('readline')

exports.loadCustomers = (filePath) => {
  return new Promise((resolve, reject) => {
    let customers = []
    this.loadFile(filePath)
      .then(lines => {
        for (let i = 0; i < lines.length; i++) {
          let customer = JSON.parse(lines[i])
          if (customer.name == null || customer.name === '' || isNaN(customer.user_id) || isNaN(customer.latitude) || isNaN(customer.longitude)) {
            throw new Error('Bad format into ' + filePath + ' at line ' + (i + 1))
          }
          customers.push(customer)
        }
        resolve(customers)
      })
      .catch(reject)
  })
}

exports.loadFile = (filePath) => {
  return new Promise((resolve, reject) => {
    let lines = []
    readline.createInterface({
      input: fs.createReadStream(filePath)
    })
      .on('line', line => {
        if (line.trim().length) {
          lines.push(line)
        }
      })
      .on('close', () => {
        resolve(lines)
      })
  })
}

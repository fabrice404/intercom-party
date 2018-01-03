const minimist = require('minimist')
const customer = require('./customer')
const party = require('./party')

const args = minimist(process.argv)
const latitude = args.lat || 53.339428
const longitude = args.lng || -6.257664
const maxDistance = args.distance || 100
const file = args.file || 'data/customers.json'

customer.loadCustomers(file)
  .then(customers => {
    let invited = party.listInvitedCustomers(latitude, longitude, maxDistance, customers)
    for (let i = 0; i < invited.length; i++) {
      console.log(invited[i].name)
    }
  })
  .catch(error => console.error(error))

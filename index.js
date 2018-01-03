const customer = require('./customer')
const party = require('./party')

const latitude = 53.339428
const longitude = -6.257664
const maxDistance = 100
const file = 'data/customers.json'

customer.loadCustomers(file)
  .then(customers => {
    let invited = party.listInvitedCustomers(latitude, longitude, maxDistance, customers)
    for (let i = 0; i < invited.length; i++) {
      var customer = invited[i]
      console.log(customer.name)
    }
  })
  .catch(error => console.error(error))

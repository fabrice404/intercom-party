const distance = require('../distance')

exports.listInvitedCustomers = (latitude, longitude, maxDistance, customers) => {
  if (isNaN(latitude) || latitude < -90 || +90 < latitude) {
    throw new Error('Invalid latitude: ' + latitude)
  }
  if (isNaN(longitude) || longitude < -180 || +180 < longitude) {
    throw new Error('Invalid longitude: ' + longitude)
  }
  if (isNaN(maxDistance) || maxDistance <= 0) {
    throw new Error('Invalid maxDistance: ' + maxDistance)
  }
  if (customers == null || !Array.isArray(customers)) {
    throw new Error('Invalid customers array')
  }

  if (customers.length === 0) {
    return []
  }

  let invited = []
  for (let i = 0; i < customers.length; i++) {
    let customer = customers[i]
    let userDistanceFromParty = distance.calculateDistance(latitude, longitude, customer.latitude, customer.longitude)
    if (userDistanceFromParty <= maxDistance) {
      invited.push(customer)
    }
  }
  return invited.sort((a, b) => {
    return a.user_id - b.user_id
  })
}

const customer = require('./customer')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

describe('customer', () => {
  it('should be an object', () => {
    expect(customer).to.be.a('object')
  })

  describe('#loadFile()', () => {
    it('should be a function', () => {
      expect(customer.loadFile).to.be.a('function')
    })

    it('should return expected value', () => {
      customer.loadFile('data/customers.json')
        .then(lines => {
          expect(lines.length).to.equal(32)
        })
      customer.loadFile('data/customers-empty.json')
        .then(lines => {
          expect(lines.length).to.equal(0)
        })
      customer.loadFile('data/customers-empty-lines.json')
        .then(lines => {
          expect(lines.length).to.equal(5)
        })
    })

    it('should throw an error when file does not exists', () => {
      expect(customer.loadFile('data/customers-non-existing.json')).to.be.rejected.then()
    })
  })

  describe('#loadCustomers()', () => {
    it('should be a function', () => {
      expect(customer.loadCustomers).to.be.a('function')
    })

    it('should return expected value', () => {
      customer.loadCustomers('data/customers.json')
        .then(customers => {
          expect(customers.length).to.equal(32)
        })

      customer.loadCustomers('data/customers-empty.json')
        .then(customers => {
          expect(customers.length).to.equal(0)
        })

      customer.loadCustomers('data/customers-empty-lines.json')
        .then(customers => {
          expect(customers.length).to.equal(5)
        })
    })

    it('should throw an error when file does not exists', () => {
      expect(customer.loadCustomers('data/customers-non-existing.json')).to.be.rejected.then()
    })

    it('should throw an error when an user has a missing property', () => {
      expect(customer.loadCustomers('data/customers-missing-property.json')).to.be.rejected.then()
    })

    it('should throw an error when an user has a wrong coordinate', () => {
      expect(customer.loadCustomers('data/customers-wrong-lat.json')).to.be.rejected.then()
    })

    it('should throw an error when an user has a wrong name', () => {
      expect(customer.loadCustomers('data/customers-wrong-name.json')).to.be.rejected.then()
    })

    it('should throw an error when an user has a wrong user id', () => {
      expect(customer.loadCustomers('data/customers-wrong-userid.json')).to.be.rejected.then()
    })
  })
})

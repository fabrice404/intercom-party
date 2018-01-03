const distance = require('./distance')
const expect = require('chai').expect

const coord = {
  Dublin: {
    lat: 53.350140,
    lng: -6.266155
  },
  Paris: {
    lat: 48.864716,
    lng: 2.349014
  }
}

describe('distance', () => {
  it('should be an object', () => {
    expect(distance).to.be.a('object')
  })

  describe('#convertDegToRad()', () => {
    it('should be a function', () => {
      expect(distance.convertDegToRad).to.be.a('function')
    })

    it('should return expected value', () => {
      expect(distance.convertDegToRad(180)).to.equal(Math.PI)
    })

    it('should throw an error when parameter is undefined', () => {
      expect(() => {
        distance.convertDegToRad()
      }).to.throw()
    })

    it('should throw an error when parameter is not a number', () => {
      expect(() => {
        distance.convertDegToRad('hello world')
      }).to.throw()
    })
  })

  describe('#calculateDistance()', () => {
    it('should be a function', () => {
      expect(distance.calculateDistance).to.be.a('function')
    })

    it('should return expected value', () => {
      expect(distance.calculateDistance(coord.Dublin.lat, coord.Dublin.lng, coord.Paris.lat, coord.Paris.lng)).to.equal(780.4313446291235)
    })

    it('should throw an error when coordinate is undefined', () => {
      expect(() => {
        distance.calculateDistance()
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat)
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat, coord.Dublin.lng)
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat, coord.Dublin.lng, coord.Paris.lat)
      }).to.throw()
    })

    it('should throw an error when coordinate is not a number', () => {
      expect(() => {
        distance.calculateDistance('hello world')
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat, 'hello world')
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat, coord.Dublin.lng, 'hello world')
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat, coord.Dublin.lng, coord.Paris.lat, 'hello world')
      }).to.throw()
    })

    it('should throw an error when coordinate is out of range', () => {
      expect(() => {
        distance.calculateDistance(-200)
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat, -200)
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat, coord.Dublin.lng, -200)
      }).to.throw()
      expect(() => {
        distance.calculateDistance(coord.Dublin.lat, coord.Dublin.lng, coord.Paris.lat, -200)
      }).to.throw()
    })
  })
})

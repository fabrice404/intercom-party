const party = require('./party'),
  distance = require('../distance'),
  expect = require('chai').expect,
  sinon = require('sinon');

const coord = {
  Dublin: {
    lat: 53.350140,
    lng: -6.266155
  }
};

const customers = [{
    user_id: 12,
    name: 'Christina McArdle',
    latitude: 52.986375,
    longitude: -6.043701
  },
  {
    user_id: 1,
    name: 'Alice Cahill',
    latitude: 51.92893,
    longitude: -10.27699
  },
  {
    user_id: 2,
    name: 'Ian McArdle',
    latitude: 51.8856167,
    longitude: -10.4240951
  }
];

describe('party', () => {
  it('should be an object', () => {
    expect(party).to.be.a('object');
  });

  describe('#listInvitedCustomers()', () => {
    it('should be a function', () => {
      expect(party.listInvitedCustomers).to.be.a('function');
    });

    it('should return expected value', () => {
      let distanceStub = sinon.stub(distance, 'calculateDistance')
        .callsFake(() => {
          return 30;
        });

      let invited = party.listInvitedCustomers(coord.Dublin.lat, coord.Dublin.lng, 100, customers);
      expect(invited.length).to.equal(3);
      expect(invited[0].user_id).to.equal(1);
      expect(invited[1].user_id).to.equal(2);
      expect(invited[2].user_id).to.equal(12);

      // every customer is too far
      invited = party.listInvitedCustomers(coord.Dublin.lat, coord.Dublin.lng, 10, customers);
      expect(invited.length).to.equal(0);

      // only one in customer array
      invited = party.listInvitedCustomers(coord.Dublin.lat, coord.Dublin.lng, 50, [customers[0]]);
      expect(invited.length).to.equal(1);

      // empty customer array
      invited = party.listInvitedCustomers(coord.Dublin.lat, coord.Dublin.lng, 50, []);
      expect(invited.length).to.equal(0);

      distanceStub.restore();
    });

    it('should throw an error when coordinate is undefined', () => {
      expect(() => {
        party.listInvitedCustomers()
      }).to.throw();
      expect(() => {
        party.listInvitedCustomers(coord.Dublin.lat);
      }).to.throw();
    });

    it('should throw an error when coordinate is out of range', () => {
      expect(() => {
        party.listInvitedCustomers(-200)
      }).to.throw();
      expect(() => {
        party.listInvitedCustomers(coord.Dublin.lat, 100);
      }).to.throw();
    });

    it('should throw an error when max distance is undefined', () => {
      expect(() => {
        party.listInvitedCustomers(coord.Dublin.lat, coord.Dublin.lng);
      }).to.throw();
    });

    it('should throw an error when max distance is 0 or lower than 0', () => {
      expect(() => {
        party.listInvitedCustomers(coord.Dublin.lat, coord.Dublin.lng, 0);
      }).to.throw();
      expect(() => {
        party.listInvitedCustomers(coord.Dublin.lat, coord.Dublin.lng, -10);
      }).to.throw();
    });

    it('should throw an error when customers is undefined', () => {
      expect(() => {
        party.listInvitedCustomers(coord.Dublin.lat, coord.Dublin.lng, 100);
      }).to.throw();
    });

  });
});

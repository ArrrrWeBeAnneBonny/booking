const mongoose = require('mongoose');
const connection = require('./index.js');
const request = require("supertest");
const app = require("../server/server.js");
const Model = connection.Booking;
const databaseName = 'booking';

describe('Test the seedDb method', () => {
  beforeAll(() => {
    const url = `mongodb://localhost:3002/${databaseName}`
    mongoose.connect(url, { useNewUrlParser: true })
  });

  afterAll((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

});

test('should store booking data to database', async done => {
  const booking = await Model.findOne({ campId: 0 })
  await request(app)
  .get('/booking?campId=0')
  .then((data) => {
    let site = JSON.parse(data.text);
    expect(Array.isArray(site.booked)).toBeTruthy();
  });
  done()
})





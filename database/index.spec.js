const mongoose = require('mongoose');
const connection = require('./index.js');
const Model = connection.Booking;
const databaseName = 'booking';

describe('Test the seedDb method', () => {
  beforeAll(() => {
    const url = `mongodb://127.0.0.1/${databaseName}`
    mongoose.connect(url, { useNewUrlParser: true })
  });

  afterAll((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

  it('Should save check-in date to the database', async done => {
    const res = await request.post('/checkin')
    .send({
        day: 0,
        month: 0,
        year: 2021
      })

    // Searches the user in the database
    const date = await Booking.findOne({ campId: })

    done()
  })

  it('Should save booking to database', async done => {
    // Sends request...

    // Searches the booking in the database...

    // Ensures response contains array of booked date ranges
    expect(res.body.booked).toBeTruthy()
    expect(res.body.booked).toBeTruthy() //array
    done()
  })

  // it('Should pull all calendar availability associated with a particular site from the database', async done => {
  //   const res = await request.get('/booking')
  //   done()
  // })

}



const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const db = require('../database/index.js');
const app = express();

//allow my service to accept every other proxy
const origins = ['http://localhost:2000',
'http://localhost:5500',
'http://localhost:3000'];
  // add michael's proxy port numb when avail.

app.use(cors());
app.use(cors({ origin: origins }));

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//root init route
app.get('/booking', async (req, res) => {
  let campId = parseInt(req.query.campId);
  let name = '';
  let inventory = [];
  await db.Booking.find({campId: campId})
  .then((site) => {
    let siteObj = site[0];
    inventory = siteObj.booked;
  })
  .catch((err) => {
    throw err;
  });
  await axios.get('http://localhost:3003/overview', { params: { campId: campId } })
    .then((response) => {
      name = response.data.name;
    })
    .then(() => {
      axios.get('http://localhost:3003/overview/pricing', { params: { campId: campId } })
        .then((response) => {
          let init = {};
          init.name = name;
          init.inventory = inventory;
          init.average_price_per_night = response.data.averagePricePerNight;
          init.months_out_for_booking = response.data.monthsOutForBooking;
          init.weeknight_discount = response.data.weeknightDiscount;
          init.instant_book = response.data.instantBook;
          init.cleaning_fee = response.data.cleaningFee;
          //init.max_guests = data.max_guests; ask turbo to add
          console.log('init: ', init);
          res.status(200).send(init);
        })
        .catch((err) => {
          res.status(201).send(err);
        });
    })
    .catch((err) => {
      db.Booking.find({campId: 0})
        .then((site) => {
          let siteObj = site[0];
          res.status(200).send(siteObj);
        })
        .catch((err) => {
          res.status(201).send(err);
        });
    });
});

app.get('/booking/?campId=/book', async (req, res) => {
  //define current month
  //get booked inventory to populate front end
  //checkIn = Timestamp (ISO 8601)
  //checkOut = Timestamp (ISO 8601)
});

app.get('/booking/?campId=&check_in_date=&check_out_date=/bookingTotal', async (req, res) => {
  // camp_id
  // Number
  // check_in_date
  // Timestamp (ISO 8601)
  // check_out_date
  // Timestamp (ISO 8601)
  // number_nights
  // Number
  // total
  // Number
  // subTotal
  // Number
  // cleaning_fee
  // Number
  // weeknight_discount
  // Number
});

module.exports = app;

// *back-end can grab date (current month)
//*define what value campId is
// *1 endpt for both checkin/checkout
// *need 2 dates (checkin and checkout)
// *the problem with year/month/date is timezones
// *use date std 8601, date.now
// *should be thinking about how am I going to parse this?
// *each block = type date
// *use input type Date
// *in html element for type date, can’t do 2 selections
// *need to have two cals (2 forms, encapsulate in another form?)
// *user click book needs access to both dates
// *as part of click event, move over to checkOut
// *smoke and mirrors


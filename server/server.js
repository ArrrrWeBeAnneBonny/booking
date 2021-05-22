const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const _ = require('underscore');
const moment = require('moment');
const cors = require('cors');
const db = require('../database/index.js');

const app = express();

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//root route initializes data from Overview api
app.get('/booking', async (req, res) => {
  console.log('inside /booking');
  let campId = parseInt(req.query.campId);
  let name = '';
  let init = {};
  //these calls to overview API are erroring
  await axios.get('http://localhost:3003/overview', { params: { campId: campId } })
    .then((response) => {
      console.log('inside localhost:3003/overview')
      name = response.data.name;
    })
    .then(() => {
      axios.get('http://localhost:3003/overview/pricing', { params: { campId: campId } })
        .then((response) => {
          console.log('inside localhost:3003/overview/pricing')
          console.log('turbo res: ', response);
          init.name = name;
          init.average_price_per_night = response.data.averagePricePerNight;
          init.months_out_for_booking = response.data.monthsOutForBooking;
          init.weeknight_discount = response.data.weeknightDiscount;
          init.instant_book = response.data.instantBook;
          init.cleaning_fee = response.data.cleaningFee;
          init.max_guests = data.max_guests;
          res.status(200).send(init);
        })
        .catch((err) => {
          res.status(201).send(err);
        });
    })
    .catch((err) => {
      db.Booking.find({campId: 0})
        .then((response) => {
          let site = response[0];
          init.name = 'Twisselman\’s Glamping by the Pond';
          init.campId = 0;
          init.price_per_night = site.price_per_night;
          init.how_far_out = site.how_far_out;
          init.weeknight_discount = site.weeknight_discount;
          init.instant_book = site.instant_book;
          init.cleaning_fee = site.cleaning_fee;
          init.max_guests = site.max_guests;
          res.status(200).send(init);
        })
        .catch((err) => {
          res.status(201).send(err);
        });
    });
});

//user clicks checkIn button
  //user clicks available date
  //on click switch view to checkOut
    //user clicks available date
app.get('/booking/book', async (req, res) => {
  console.log('inside /booking/book')
  let campId = parseInt(req.query.campId);
  await db.Booking.find({campId: campId})
    .then((site) => {
      let siteObj = site[0];
      let months_out = siteObj.how_far_out;
      let now = moment().format();
      let current_month = now.slice(5, 7);
      let current_day = now.slice(8, 10);
      let current_month_inventory = siteObj.booked;
      let flattened_inventory = _.flatten(current_month_inventory);
      //add current day to unavailable inventory
      if (flattened_inventory.indexOf(current_day) === -1) {
        let numb_day = Number(current_day);
        flattened_inventory.push(numb_day);
      }
      let inv = [ 1, 2, 3, 15, 16, 17, 25, 26, 27, 28, 29, 21 ]
      let inventories = [];
      let index = 0;
      for (let i = 0; i < 6; i++) {
        if (!inventories.length) {
          let next_month_inventory = inv.map(item => {
            let newItem = (item + 1);
            if (newItem > 31) {
              newItem = 1;
              return newItem;
            } else {
              return newItem;
            }
          });
          index ++;
          next_month_inventory.pop();
          inventories.push(next_month_inventory);
        } else {
          let last_month = inventories[index - 1];
          let next_month_inventory = last_month.map(item => {
            let newItem = (item + 1);
            if (newItem > 31) {
              newItem = 1;
              return newItem;
            } else {
              return newItem;
            }
          });
          index ++;
          inventories.push(next_month_inventory);
        }
      }
      let inventory_data = {};
      inventory_data.inventory = inventories;
      inventory_data.month = current_month;
      res.status(200).send(JSON.stringify(inventory_data));
  })
  .catch((err) => {
    res.status(201).send(err);
  });
});

//this endpt is triggered when user clicks eligible checkOut date
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

//write unit test for error route
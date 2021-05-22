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
  let campId = parseInt(req.query.campId);
  let name = '';
  await axios.get('http://localhost:3003/overview', { params: { campId: campId } })
    .then((response) => {
      name = response.data.name;
    })
    .then(() => {
      axios.get('http://localhost:3003/overview/pricing', { params: { campId: campId } })
        .then((response) => {
          let init = {};
          init.name = name;
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
          console.log('siteObj: ', siteObj);
          let today = moment().format("MMM Do YY");
          let currentMonth
          res.status(200).send(siteObj);
        })
        .catch((err) => {
          res.status(201).send(err);
        });
    });
});

//booked is now an array of random consecutive numbers
  //shuffle X months out times
  //return as inventory

app.get('/booking/fake', async (req, res) => {
  console.log('insie /booking/fake')
  await db.Booking.find({campId: 0})
    .then((site) => {
      let siteObj = site[0];
      let months_out = siteObj.how_far_out;
      let inventories = [];
      let newInventory = [];
      let inventory = siteObj.booked;
      //[[3,4],[10,14],[24,26],[30,2]]
      inventory.forEach(item => {
        let start = item[0];
        let end = item[item.length - 1];
        let newItem = [];
        for ( let i = start; i <= end; i++ ) {
          newItem.push(i);
        }
        newInventory.push(newItem);
      });

    // for ( let i = 0; i < months_out; i++ ) {
    //   let new
    // }

    // inventory

    // let now = moment().add(10, 'days').calendar();
    // let current_month = now.slice(0, 2);
    // console.log('current_month: ', current_month); //05
    // let current_day = now.slice(3, 5);
    // console.log('current_day: ', current_day); //31
    // res.status(200).send(siteObj);
  })
  .catch((err) => {
    res.status(201).send(err);
  });
});

//user clicks checkIn button
  //user clicks available date
  //on click switch view to checkOut
    //user clicks available date
app.get('/booking/book', async (req, res) => {
  let campId = parseInt(req.query.campId);

  let now = moment().add(10, 'days').calendar();
  console.log('now: ', now); // 05/31/2021
  console.log('now: ', typeof now); //string
  let current_month = now.slice(0, 2);
  console.log('current_month: ', current_month); //05
  let current_day = now.slice(3, 5);
  console.log('current_day: ', current_day); //31

  let inventory = [];

  await db.Booking.find({campId: campId})
    .then((site) => {
      let data = {};
      let siteObj = site[0];
      data.inventory = siteObj.booked;
      // data.month = parse now
      res.status(200).send(data);
    })
    .catch((err) => {
      throw err;
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
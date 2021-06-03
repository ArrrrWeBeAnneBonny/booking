const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const db = require('../database/index.js');
const db_helper = require('../database/helper.js');
const helper = require('./helper.js');

const app = express();

const mode = process.env.NODE_ENV;
console.log(`hi you are in ${mode}`);

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/booking', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }
  let init = {};
  const booked = await db_helper.findBookedArray({ campId: campId });
  init.booked = booked.booked;
  await axios.get('http://localhost:3003/overview/pricing', { params: { campId: campId } })
    .then(async (response) => {
      const site = response.data;
      console.log('site line 33: ', site);
      init.average_price_per_night = site.averagePricePerNight;
      init.how_far_out = site.monthsOutForBooking;
      init.weeknight_discount = site.weeknightDiscount;
      init.instant_book = site.instantBook;
      init.cleaning_fee = site.cleaningFee;
      init.max_guests = site.maxGuests;
      console.log('init 40: ', init)
      const data = await db_helper.findAndFormatInventory({campId: campId}, init.how_far_out, init.booked)
      console.log('data 39: ', data);
      console.log('init 40: ', init);
      res.status(200).send(JSON.stringify(init));
    })
    .catch(async (err) => {
      console.log('err: ', err);
      let init = await db_helper.find({campId: 0});
      const data = await db_helper.findAndFormatInventory({campId: campId});
      init.inventory = data.inventory;
      init.current_month = data.current_month;
      res.status(200).send(JSON.stringify(init));
      });
});

app.get('/booking/bookingTotal', async (req, res) => {
  let campId = req.query.campId;
  if (!campId) {
    campId = 0;
  }
  let check_in_date =  req.query.check_in_date;
  let check_out_date =  req.query.check_out_date;
  let mssg = `new booking created for campId ${campId}`;
  res.status(200).send(mssg);
});

module.exports = app;


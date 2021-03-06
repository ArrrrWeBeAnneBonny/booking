const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const db = require('../database/index.js');
const db_helper = require('../database/helper.js');
const helper = require('./helper.js');
const config = require('../config.js');

const app = express();

const mode = process.env.NODE_ENV;
console.log(`hi bebe you are in ${mode}`);
let overview_url = '';
if (!process.env.NODE_ENV || mode === 'development') {
  overview_url += config.development.overview;
} else {
  overview_url += config.production.overview;
}

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/booking', async (req, res) => {
  console.log('inside /booking')
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }
  let init = {};
  const booked = await db_helper.findBookedArray({ campId: campId });
  init.booked = booked.booked;
  let url_path = `${overview_url}pricing`;
  console.log('overview url_path: ', url_path);
  await axios.get(url_path, { params: { campId: campId } })
    .then(async (response) => {
      const site = response.data;
      init.average_price_per_night = site.averagePricePerNight;
      init.how_far_out = site.monthsOutForBooking;
      init.weeknight_discount = site.weeknightDiscount;
      init.instant_book = site.instantBook;
      init.cleaning_fee = site.cleaningFee;
      init.max_guests = site.maxGuests;
      const data = await db_helper.findAndFormatInventory({campId: campId}, init.how_far_out, init.booked)
      res.status(200).send(JSON.stringify(init));
    })
    .catch(async (err) => {
      console.log('did not connect to overview api');
      let init = await db_helper.find({campId: 0});
      init.average_price_per_night = init.price_per_night;
      delete init.price_per_night;
      const data = await db_helper.findAndFormatInventory({campId: campId});
      init.booked = data.inventory;
      init.current_month = data.current_month;
      res.status(200).send(JSON.stringify(init));
    });
});

app.get('/bookingTotal', async (req, res) => {
  const query = req.query;
  const check_in_date = req.query.check_in_date;
  let campId = req.query.campId;
  if (!campId) {
    campId = 0;
  }
  let booking = {
    campId: campId,
    check_in_date: query.check_in_date,
    check_out_date: query.check_out_date,
    number_nights: query.number_nights,
    subTotal: query.subTotal,
    total: query.total
  };
  res.status(200).send(booking);
});

module.exports = app;


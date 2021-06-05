const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const db = require('../database/index.js');
const db_helper = require('../database/helper.js');
const helper = require('./helper.js');
const config = require('./config.js');

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
  let overview_url = '';
  if (mode === 'production') {
    overview_url += config.prod.overview;
  } else if (mode === 'development' || mode === undefined) {
    overview_url += config.dev.overview;
  }
  console.log('overview_url: ', overview_url);
  await axios.get(overview_url, { params: { campId: campId } })
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
      let init = await db_helper.find({campId: 0});
      init.average_price_per_night = init.price_per_night;
      delete init.price_per_night;
      const data = await db_helper.findAndFormatInventory({campId: campId});
      init.inventory = data.inventory;
      init.current_month = data.current_month;
      console.log('init line 51: ', init);
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


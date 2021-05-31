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

app.get('/booking', async (req, res) => {
  let init = {};
  let name = '';
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }
  await db.Booking.find({campId: campId})
    .then((site) => {
      const months_out = site[0].how_far_out;
      const i = site[0].booked;
      const now = moment().format();
      const current_month = now.slice(5, 7).split('')[1];
      const current_day = now.slice(8, 10);
      const flattened_inventory = _.flatten(i);
      if (flattened_inventory.indexOf(current_day) === -1) {
        flattened_inventory.push(Number(current_day));
      }
      let inventories = [];
      let index = 0;
      for (let i = 0; i < months_out; i++) {
        if (!inventories.length) {
          let next_month_inventory = flattened_inventory.map(item => {
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
      let inventory = {};
      let month = 0;
      inventories.forEach(i => {
        inventory[month] = i;
        month ++;
      });
      init.inventory = inventory;
      init.current_month = Number(current_month);
      axios.get('http://localhost:3003/overview', { params: { campId: campId } })
      .then((response) => {
        name = response.data.name;
      })
      .then(() => {
        axios.get('http://localhost:3003/overview/pricing', { params: { campId: campId } })
          .then((response) => {
            init.name = name;
            init.average_price_per_night = response.data.averagePricePerNight;
            init.months_out_for_booking = response.data.monthsOutForBooking;
            init.weeknight_discount = response.data.weeknightDiscount;
            init.instant_book = response.data.instantBook;
            init.cleaning_fee = response.data.cleaningFee;
            init.max_guests = data.max_guests;
            res.status(200).send(JSON.stringify(init));
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
  })
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

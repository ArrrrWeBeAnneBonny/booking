const mongoose = require('mongoose');
const faker = require('faker');
const mongoUri = 'mongodb://localhost/booking';
const db = require('./index.js');

const booking_schema = new mongoose.Schema({
  campId: Number,
  price_per_night: Number,
  max_guests: Number,
  guests: Number,
  year: Number,
  month: Number,
  booked: [Array],
  year: Number,
  month: Number,
  check_in_date: String,
  check_out_date: String,
  number_nights: Number,
  cleaning_fee: Number,
  weeknight_discount: Number,
  instant_book: Boolean,
  request_to_book: Boolean
});

const Booking = mongoose.model('Booking', booking_schema);

const seedDb = async () => {

  for (let i = 0; i <= 99; i++) {

    monthMaker = function() {
      let months = [5, 6, 7, 8];
      let month = months[Math.floor(Math.random() * months.length)];
      return month;
    };

    monthDays = function(month) {
      let days = [];
      if (month === 2) {
        days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
      }
      let thirty = [4, 6, 9, 11];
      let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
      if (thirty.indexOf(month) === -1) {
        days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      } else {
        days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
      }
      return days;
    };

    unavailableDays = function(array) {
      let indexes = [];
      let unavailable = [];
      let ranges = [1, 2, 3, 4, 5];
      let randomNumb = ranges[Math.floor(Math.random() * ranges.length)];
      while (indexes.length < randomNumb) {
        let index = array[Math.floor(Math.random() * array.length)];
        if (indexes.indexOf(index) === -1) {
          indexes.push(index);
        }
      }
      indexes.forEach(index => {
        let numb = array[index];
        let rangeEnd = (numb + randomNumb);
        let overflow = 0;
        let range = [];
        if (rangeEnd > array.length) {
          overflow += (rangeEnd - array.length);
          range = [array[index], overflow];
        } else {
          overflow += randomNumb;
          let end = (numb + overflow);
          range = [numb, end];
        }
        unavailable.push(range);
      });
      return unavailable;
    };

    avgPrice = function(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    };

    discountMaker = function() {
      let discounts = [5, 10, 15, 20];
      let discount = discounts[Math.floor(Math.random() * discounts.length)];
      return discount;
    };

    booleanMaker = function() {
      let bools = [true, false];
      let bool = bools[Math.floor(Math.random() * bools.length)];
      return bool;
    };

    far = function() {
      let farOutOptions = [30, 60, 90];
      let farOut = farOutOptions[Math.floor(Math.random() * farOutOptions.length)];
      return farOut;
    };

    randomNumberMaker = function() {
      let daysRange = [1, 2, 3, 4, 5, 6, 7];
      let numbDays = daysRange[Math.floor(Math.random() * daysRange.length)];
      return numbDays;
    };

    startDay = function(b, d) {
      let bookedStartDates = [];
      for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < b[i].length; j++) {
          if (j === 0) {
            bookedStartDates.push(b[i][j]);
          }
        }
      }
      let randomStartDate = d[Math.floor(Math.random() * d.length)];
      const walk = function(r) {
        if (bookedStartDates.indexOf(r) === -1) {
          return r;
        } else {
          let otherRandomStartDate = d[Math.floor(Math.random() * d.length)];
          return walk(otherRandomStartDate);
        }
      };
      return walk(randomStartDate);
    };

    let newBooking = {};

    if (i === 0) {

      newBooking = {
        campId: 0,
        price_per_night: 165,
        guests: 2,
        how_far_out: 6,
        instant_book: true,
        request_to_book: false,
        year: 2021,
        month: 6,
        booked: [3, 10, 24],
        check_in_date: '2021-06-07T14:48:00.000Z',
        check_out_date: '2021-06-10T14:48:00.000Z',
        number_nights: 3,
        number_guests: 2,
        cleaning_fee: 15,
        weeknight_discount: .2,
        subTotal: 426
      };

      await Booking.create(newBooking)
      .then(data => {
        console.log(`twisselman record saved`);
      })
      .catch((err) => {
        throw err;
      });
      continue;

    } else {

    let price = avgPrice(75, 325);
    let numb = randomNumberMaker();
    let month = monthMaker();
    let days = monthDays(month);
    let unavailable = unavailableDays(days);
    let inDay = startDay(unavailable, days);
    let outDay = (inDay + randomNumberMaker());

    newBooking = {
      campId: i,
      price_per_night: price,
      guests: randomNumberMaker(),
      how_far_out: far(),
      instant_book: booleanMaker(),
      request_to_book: !booleanMaker(),
      year: 2021,
      month: month,
      booked: unavailable,
      check_in_date: inDay,
      check_out_date: outDay,
      number_nights: (outDay - inDay),
      cleaning_fee: (price / 10),
      weeknight_discount: discountMaker(),
      }

    }

    Booking.create(newBooking)
    .then(data => {
      console.log(`record ${i} saved`);
    })
    .catch((err) => {
      throw err;
    });

  }

};

module.exports = { seedDb }

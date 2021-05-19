const mongoose = require('mongoose');
const faker = require('faker');
const mongoUri = 'mongodb://localhost/booking';
const db = require('./index.js');

//SCHEMA
const booking_schema = new mongoose.Schema({
  campId: Number,
  price_per_night: Number,
  booked: [Array],
  max_guests: Number,
  guests: Number,
  howFarOut: Number,
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

  monthMaker = function() {
    let months = [5, 6, 7, 8];
    let month = months[Math.floor(Math.random() * months.length)];
    return month;
  };

  monthDays = function(month) {
    let days = [];
    if (month === 2) {
      days = Array.from({length: 28}, (_, i) => i + 1);
    }
    let thirty = [4, 6, 9, 11];
    let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
    if (thirty.indexOf(month) === -1) {
      days = Array.from({length: 31}, (_, i) => i + 1);
    } else {
      days = Array.from({length: 30}, (_, i) => i + 1);
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
    let farOutOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
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
  isoMaker = function(month, inDate) {
    //"2011-12-19T15:28:46.493Z"
    const hour = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const min = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const sec = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    let h = hour(0, 23);
    let m = min(0, 59);
    let s = sec(0, 60);
    let str =`2021-${month}-${inDate}T${h}:${m}.${s}Z`;
    return str;
  }

  for (let i = 0; i <= 99; i++) {

    let newBooking = {};

    if (i === 0) {

      newBooking = {
        campId: 0,
        price_per_night: 165,
        booked: [[3, 4], [10, 14], [24, 26], [30, 2]],
        max_guests: 6,
        guests: 2,
        howFarOut: 6,
        year: 2021,
        month: 6,
        check_in_date: '2021-06-07T14:48:00.000Z',
        check_out_date: '2021-06-10T14:48:00.000Z',
        number_nights: 3,
        cleaning_fee: 15,
        weeknight_discount: .2,
        instant_book: true,
        request_to_book: false,
      };
    } else {

    let max = randomNumberMaker();
    let g = (max - 1);
    let price = avgPrice(75, 325);
    let numb = randomNumberMaker();
    let month = monthMaker();
    let days = monthDays(month);
    let unavailable = unavailableDays(days);
    let inDay = startDay(unavailable, days);
    let outDay = (inDay + randomNumberMaker());
    let farOut = far();

    newBooking = {
      campId: i,
      price_per_night: price,
      booked: unavailable,
      max_guests: max,
      guests: g,
      howFarOut: farOut,
      year: 2021,
      month: month,
      check_in_date: isoMaker(month, inDay),
      check_out_date: isoMaker(month, outDay),
      number_nights: (outDay - inDay),
      cleaning_fee: (price / 10),
      weeknight_discount: discountMaker(),
      instant_book: booleanMaker(),
      request_to_book: !booleanMaker(),
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

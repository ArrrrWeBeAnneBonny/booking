const mongoose = require('mongoose');
const faker = require('faker');
const mongoUri = 'mongodb://localhost/booking';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('connected', function() {
  console.log('success connecting to mongo in seed.js');
});

const booking_schema = new mongoose.Schema({
  campId: Number,
  price_per_night: Number,
  max_guests: Number,
  guests: Number,
  year: Number,
  month: Number,
  booked: [Number],
  year: Number,
  month: Number,
  check_in_date: String,
  check_out_date: String,
  number_nights: Number,
  cleaning_fee: Number,
  weeknight_discount: Number,
  instant_book: Boolean,
  request_to_book: Boolean,
  addons_names: [String],
  addons_price: Number,
  subTotal: Number
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
      if (month !== 6) {
        days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
      } else {
        days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      }
      return days;
    }

    unavailableDays = function(array) {
      let indexes = [];
      let unavailable = [];
      for (let i = 0; i <= 4; i++) {
        let index = array[Math.floor(Math.random() * array.length)];
        indexes.push[index];
      }
      indexes.forEach(index => {
        unavailable.push(array[i]);
      });
      return unavailable;
    };

    randomNumberMaker = function() {
      let daysRange = [1, 2, 3, 4, 5, 6, 7];
      let numbDays = daysRange[Math.floor(Math.random() * daysRange.length)];
      return numbDays;
    };

    startDay = function(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
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
    makeAddons = function() {
      let items = ['firewood', 'toilet paper', 'water'];
      let item = items[Math.floor(Math.random() * items.length)];
      return item;
    };
    makeAddonPrice = function() {
      let prices = [5, 10, 15, 20, 25];
      let price = prices[Math.floor(Math.random() * prices.length)];
      return price;
    };

    let price = avgPrice(75, 325);
    let numb = randomNumberMaker();
    let month = monthMaker();
    let days = monthDays(month);
    let unavailable = unavailableDays(days);

    let newBooking = {};

    if (i === 0) {
      const twisselman = {
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
        addons_names: ['firewood'],
        addons_price: 15,
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
        check_in_date: startDay(23, 1),
        check_out_date: (startDay(23, 1) + randomNumberMaker()),
        number_nights: randomNumberMaker(),
        cleaning_fee: (price / 10),
        weeknight_discount: discountMaker(),
        addons_names: makeAddons(),
        addons_price: makeAddonPrice(),
        subTotal: (price * numb)
      }
    }

    Booking.create(newBooking)
      .then(data => {
        console.log(`${i}th record saved`);
      })
      .catch((err) => {
        throw err;
      });
  }

};

module.exports = { seedDb }

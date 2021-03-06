const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { seedDb } = require('./seed.js');

// const mode = process.env.NODE_ENV;

// console.log('mode: ', mode);

// let uri = '';

// if (mode === "development" || mode === undefined) {
//   uri = "mongodb://localhost:27017/booking";
// } else if (mode === "production") {
//   uri = "mongodb://mongo:27017/booking";

// }
// console.log('connection uri: ', uri);

const uri = "mongodb://localhost/booking";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, `connection error`));
db.once('connected', function() {
  console.log(`success connecting to mongo faulkner luvs you`);
});

const Booking = mongoose.model('Booking');

const seeder = async () => {
  await Booking.find().exec()
    .then(result => {
      if (result.length === 100) {
        console.log('finished seeding db');
      } else {
        seedDb();
      }
    });
};

seeder();

module.exports = {Booking, db};

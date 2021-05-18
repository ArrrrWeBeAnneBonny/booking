const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/booking';
mongoose.Promise = global.Promise;
const { seedDb } = require('./seed.js');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function() {
  console.log('success connecting to mongo faulkner luvs you');
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

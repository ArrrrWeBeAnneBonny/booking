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

const seeder = async () => {
  seedDb();
};

seeder();

const Booking = mongoose.model('Booking');

module.exports.Booking = Booking;
module.exports.db = db;

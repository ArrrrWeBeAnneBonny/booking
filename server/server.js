const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Success at http://localhost:${PORT}/booking faulkner loves you`);
});

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/booking', async (req, res) => {
  let data = {
    campId: 0,
    booking_id: 0,
    month: 6,
    year: 2021,
    check_in_date: '2021-06-07T14:48:00.000Z',
    check_out_date: '2021-06-10T14:48:00.000Z',
    number_nights: 3,
    number_guests: 2,
    price_per_night: 165,
    how_many_months_out_booking_can_be_made: 6,
    weeknight_discount: 8,
    instant_book: true,
    request_to_book: false,
    cleaning_fee: 15,
    subTotal: 411
  };
  res.status(200).send(data);
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index.js');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/booking', async (req, res) => {
  let campId = parseInt(req.query.campId);
  res.setHeader('Content-Type', 'application/json');
  await db.Booking.find({campId: campId})
  .then((site) => {
    let siteObj = site[0];
    console.log('siteObj: ', siteObj);
    res.status(200).send(siteObj);
  })
  .catch((err) => {
    throw err;
  });
});

module.exports = app;


// *back-end can grab date (current month)
//*define what value campId is
// *1 endpt for both checkin/checkout
// *need 2 dates (checkin and checkout)
// *the problem with year/month/date is timezones
// *use date std 8601, date.now
// *should be thinking about how am I going to parse this?
// *each block = type date
// *use input type Date
// *in html element for type date, can’t do 2 selections
// *need to have two cals (2 forms, encapsulate in another form?)
// *user click book needs access to both dates
// *as part of click event, move over to checkOut
// *smoke and mirrors

//add call lodinginfo API overview

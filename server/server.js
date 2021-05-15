const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/booking', async (req, res) => {
  let campId = parseInt(req.query.campId);
  await db.Booking.find({campId: campId})
  .then((site) => {
    let siteObj = site[0];
    res.status(200).send(siteObj);
  })
  .catch((err) => {
    throw err;
  });
});

module.exports = app;
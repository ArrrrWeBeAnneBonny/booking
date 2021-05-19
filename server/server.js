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
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/booking', async (req, res) => {
  let campId = req.query.campId;
  let numbCampId = Number(campId);
  await db.Booking.find({campId: numbCampId})
  .then((site) => {
    res.send(site);
  })
  .catch((err) => {
    res.send(err);
  });
});

module.exports = { app };
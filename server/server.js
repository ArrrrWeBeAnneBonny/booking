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


app.get('/book', async (req, res) => {
  // console.log('req.params.campId: ', req.params.campId);
    await db.Booking.find({campId: 0})
    .then((site) => {
      console.log('site: ', site);
      res.status(200).send(site);
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = { app };
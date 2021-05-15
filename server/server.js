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
  console.log('req: ', req);
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
const app = require("./server.js");
let config = require('../config.js');

const PORT = 3002;
let mode = process.env.NODE_ENV;

let url = '';

if (mode === 'development' || mode === undefined) {
  url += config.development.booking;
} else if (mode === 'production') {
  url += config.production.booking;
}

app.listen(PORT, () => {
  console.log(`Success at ${url} faulkner loves you`);
});

const app = require("./server.js");

const PORT = 3002;

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('We are in production mode!');
}

app.listen(PORT, () => {
  console.log(`Success at http://localhost:${PORT} faulkner loves you`);
});
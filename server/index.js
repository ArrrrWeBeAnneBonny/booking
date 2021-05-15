const app = require("./server.js");

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Success at http://localhost:${PORT}/booking faulkner loves you`);
});
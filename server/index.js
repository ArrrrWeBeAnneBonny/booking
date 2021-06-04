const app = require("./server.js");

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Success at http://localhost:${PORT} faulkner loves you`);
});

//EC2
//https://ec2-3-142-79-153.us-east-2.compute.amazonaws.com/
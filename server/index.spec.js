
const request = require('supertest');
const server = require('./server.js');

describe("Test the root path", () => {
  test("It should respond to GET request to /book", async () => {
    const response = await request(server.app).get("/book");
    expect(response.statusCode).toBe(200);
  });
});

request(server.app)
  .get('/book')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
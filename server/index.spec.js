const request = require("supertest");
const app = require("./server.js");

describe("Test the root path to booking API", () => {
  test("It should respond to GET request", () => {
    return request(app)
      .get("/booking")
      .query({ campId: 0 })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});


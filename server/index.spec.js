const request = require("supertest");
const app = require("./server.js");

describe("Test the root path to booking API", () => {
  test("should respond to GET request", () => {
    return request(app)
      .get("/booking")
      .query({ campId: 0 })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    done();
  });

  test('should return a site object',  async (done) => {
    return request(app)
      .get('/booking?campId=0')
      .then((data) => {
        console.log('data.text: ', data.text);
        let site = JSON.parse(data.text);
        console.log('site: ', site);
        expect(site).toMatchObject({
          booked: [ [ 3, 4 ], [ 10, 14 ], [ 24, 26 ], [ 30, 2 ] ],
          _id: '609e0223531f0f00dc693823',
          campId: 0,
          price_per_night: 165,
          guests: 2,
          instant_book: true,
          request_to_book: false,
          year: 2021,
          month: 6,
          check_in_date: '2021-06-07T14:48:00.000Z',
          check_out_date: '2021-06-10T14:48:00.000Z',
          number_nights: 3,
          cleaning_fee: 15,
          weeknight_discount: .2,
          how_far_out: 6,
        })
      });
    done();
  });
});


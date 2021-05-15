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
  test('should return a site object with certain properties',  async (done) => {
    await request(app)
      .get('/booking?campId=0')
      .then((data) => {
        let site = JSON.parse(data.text);
        let inDate = new Date('05 June 2021 14:48 UTC');
        let outDate = new Date('09 June 2021 20:15 UTC');
        let isoIn = inDate.toISOString();
        let isoOut = outDate.toISOString();;
        let bookingObj = {
          __v: 0,
          booked: expect.any(Array),
          _id: expect.any(String),
          campId: expect.any(Number),
          price_per_night: expect.any(Number),
          guests: expect.any(Number),
          how_far_out: expect.any(Number),
          instant_book: expect.any(Boolean),
          request_to_book: expect.any(Boolean),
          year: expect.any(Number),
          month: expect.any(Number),
          check_in_date: '2021-06-07T14:48:00.000Z',
          check_out_date: '2021-06-10T14:48:00.000Z',
          number_nights: expect.any(Number),
          cleaning_fee: expect.any(Number),
          weeknight_discount: expect.any(Number)
        };
        let mockObj = {
          booked: [[3, 4], [10, 14], [24, 26], [30, 2]],
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
          weeknight_discount: .2
        };
        let obj = {
          campId: 0
        };
        expect(bookingObj).toBeTruthy();
        expect(bookingObj).toMatchObject(site);
        expect(bookingObj).toMatchObject(mockObj);
        })
    done();
  });
  test('booked should be an array of date ranges that are unavailable for a given campId',  async (done) => {
    await request(app)
      .get('/booking?campId=0')
      .then((data) => {
        let site = JSON.parse(data.text);
        expect(Array.isArray(site.booked)).toBeTruthy();
      });
    done();
  });
  test('booked should be an array of date ranges that are unavailable for a given campId',  async (done) => {
    await request(app)
      .get('/booking?campId=0')
      .then((data) => {
        let site = JSON.parse(data.text);
        expect(Array.isArray(site.booked)).toBeTruthy();
      });
    done();
  });
});

//GOAL:
//test each function that I have
//test for happy path as well as edge cases
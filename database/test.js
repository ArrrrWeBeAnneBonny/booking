
// // unavailableDays = function(array) {
// //   let indexes = [];
// //   let unavailable = [];
// //   let ranges = [1, 2, 3, 4, 5];
// //   let randomNumb = ranges[Math.floor(Math.random() * ranges.length)];
// //   while (indexes.length < randomNumb) {
// //     let index = array[Math.floor(Math.random() * array.length)];
// //     if (indexes.indexOf(index) === -1) {
// //       indexes.push(index);
// //     }
// //   }
// //   indexes.forEach(index => {
// //     let numb = array[index];
// //     let rangeEnd = (numb + randomNumb);
// //     let overflow = 0;
// //     let range = [];
// //     if (rangeEnd > array.length) {
// //       overflow += (rangeEnd - array.length);
// //       range = [array[index], overflow];
// //     } else {
// //       overflow += randomNumb;
// //       let end = (numb + overflow);
// //       range = [numb, end];
// //     }
// //     unavailable.push(range);
// //   });
// //   return unavailable;
// // };

// // let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
// // console.log(unavailableDays(days));


// let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

// let booked = [[9, 12], [19, 22], [12, 15]];

// startDay = function(b, d) {
//   let bookedStartDates = [];
//   for (let i = 0; i < b.length; i++) {
//     for (let j = 0; j < b[i].length; j++) {
//       if (j === 0) {
//         bookedStartDates.push(b[i][j]);
//       }
//     }
//   }
//   let randomStartDate = d[Math.floor(Math.random() * d.length)];
//   const walk = function(r) {
//     if (bookedStartDates.indexOf(r) === -1) {
//       return r;
//     } else {
//       let otherRandomStartDate = d[Math.floor(Math.random() * d.length)];
//       return walk(otherRandomStartDate);
//     }
//   };
//   return walk(randomStartDate);
// };

// numberOfDaysMaker = function() {
//   let daysRange = [1, 2, 3, 4, 5, 6, 7];
//   let numbDays = daysRange[Math.floor(Math.random() * daysRange.length)];
//   return numbDays;
// };

// console.log(numberOfDaysMaker());

const makeNewBooking = function() {
  for (let i = 0; i <= 99; i++) {
    monthMaker = function() {
      let months = [5, 6, 7, 8];
      let month = months[Math.floor(Math.random() * months.length)];
      return month;
    };
    monthDays = function(month) {
      let days = [];
      if (month === 2) {
        days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
      }
      let thirty = [4, 6, 9, 11];
      let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
      if (thirty.indexOf(month) === -1) {
        days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      } else {
        days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
      }
      return days;
    }
    unavailableDays = function(array) {
      let indexes = [];
      let unavailable = [];
      let ranges = [1, 2, 3, 4, 5];
      let randomNumb = ranges[Math.floor(Math.random() * ranges.length)];
      while (indexes.length < randomNumb) {
        let index = array[Math.floor(Math.random() * array.length)];
        if (indexes.indexOf(index) === -1) {
          indexes.push(index);
        }
      }
      indexes.forEach(index => {
        let numb = array[index];
        let rangeEnd = (numb + randomNumb);
        let overflow = 0;
        let range = [];
        if (rangeEnd > array.length) {
          overflow += (rangeEnd - array.length);
          range = [array[index], overflow];
        } else {
          overflow += randomNumb;
          let end = (numb + overflow);
          range = [numb, end];
        }
        unavailable.push(range);
      });
      return unavailable;
    };
    avgPrice = function(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    };
    discountMaker = function() {
      let discounts = [5, 10, 15, 20];
      let discount = discounts[Math.floor(Math.random() * discounts.length)];
      return discount;
    };
    booleanMaker = function() {
      let bools = [true, false];
      let bool = bools[Math.floor(Math.random() * bools.length)];
      return bool;
    };
    far = function() {
      let farOutOptions = [30, 60, 90];
      let farOut = farOutOptions[Math.floor(Math.random() * farOutOptions.length)];
      return farOut;
    };
    randomNumberMaker = function() {
      let daysRange = [1, 2, 3, 4, 5, 6, 7];
      let numbDays = daysRange[Math.floor(Math.random() * daysRange.length)];
      return numbDays;
    };
    startDay = function(b, d) {
      let bookedStartDates = [];
      for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < b[i].length; j++) {
          if (j === 0) {
            bookedStartDates.push(b[i][j]);
          }
        }
      }
      let randomStartDate = d[Math.floor(Math.random() * d.length)];
      const walk = function(r) {
        if (bookedStartDates.indexOf(r) === -1) {
          return r;
        } else {
          let otherRandomStartDate = d[Math.floor(Math.random() * d.length)];
          return walk(otherRandomStartDate);
        }
      };
      return walk(randomStartDate);
    };
    let price = avgPrice(75, 325);
    let numb = randomNumberMaker();
    let month = monthMaker();
    let days = monthDays(month);
    let unavailable = unavailableDays(days);
    let inDay = startDay(unavailable, days);
    console.log('inDay: ', inDay);
    let outDay = (inDay + randomNumberMaker());
    console.log('outDay: ', outDay);
    newBooking = {
      campId: i,
      price_per_night: price,
      guests: randomNumberMaker(),
      how_far_out: far(),
      instant_book: booleanMaker(),
      request_to_book: !booleanMaker(),
      year: 2021,
      month: month,
      booked: unavailable,
      check_in_date: inDay,
      check_out_date: outDay,
      number_nights: (inDay - outDay),
      cleaning_fee: (price / 10),
      weeknight_discount: discountMaker(),
      subTotal: (price * numb)
      }
    console.log('newBooking: ', newBooking);
  }
}

console.log(makeNewBooking());
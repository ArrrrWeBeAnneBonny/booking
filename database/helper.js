const db = require('./index.js');
const helper = require('../server/helper.js');

module.exports = {

  find: async ({campId: campId}) => {
    let init = {};
    await db.Booking.find({campId: campId}).exec()
    .then(data => {
      const site = data[0];
      init.campId = site.campId;
      init.inventory = site.booked;
      init.how_far_out = site.how_far_out;
      init.price_per_night = site.price_per_night;
      init.weeknight_discount = site.weeknight_discount;
      init.instant_book = site.instant_book;
      init.cleaning_fee = site.cleaning_fee;
      init.max_guests = site.max_guests;
    })
    .catch((err) => {
      throw err;
    })
  return init;
  },

  findBookedArray: async ({campId: campId}) => {
    let result = {};
    await db.Booking.find({campId: campId}).exec()
    .then(data => {
      result.booked = data[0].booked;
    })
    .catch((err) => {
      throw err;
    })
  return result;
  },

  findAndFormatInventory: async ({campId: campId}) => {
    let result = {};
    await db.Booking.find({campId: campId}).exec()
      .then(data => {
        let site = data[0];
        let inventory_data = helper.buildInventory(site.how_far_out, site.booked);
        result.inventory = inventory_data.inventory;
        const month = Number(inventory_data.current_month);
        result.current_month = month;
      })
      .catch((err) => {
        throw err;
      })
    return result;
  }

};
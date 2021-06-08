const moment = require('moment');
const _ = require('underscore');

module.exports = {
  buildInventory: (m, inv) => {
    const now = moment().format();
    const current_month = now.slice(5, 7).split('')[1];
    const current_day = now.slice(8, 10);
    const flattened_inventory = _.flatten(inv);
    if (flattened_inventory.indexOf(current_day) === -1) {
      flattened_inventory.push(Number(current_day));
    }
    let inventories = [];
    let index = 0;
    for (let i = 0; i < m; i++) {
      if (!inventories.length) {
        let next_month_inventory = flattened_inventory.map(item => {
          let newItem = (item + 1);
          if (newItem > 31) {
            newItem = 1;
            return newItem;
          } else {
            return newItem;
          }
        });
        index ++;
        next_month_inventory.pop();
        inventories.push(next_month_inventory);
      } else {
        let last_month = inventories[index - 1];
        let next_month_inventory = last_month.map(item => {
          let newItem = (item + 1);
          if (newItem > 31) {
            newItem = 1;
            return newItem;
          } else {
            return newItem;
          }
        });
        index ++;
        inventories.push(next_month_inventory);
      }
    }
    let inventory = {};
    let month = 0;
    inventories.forEach(i => {
      inventory[month] = i;
      month ++;
    });
    let result = {};
    result.inventory = inventory;
    result.current_month = Number(current_month);
    return result;
  },
  makeISODate: (day, month) => {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const ISO_string =`2021-${month}-${day}T${hour}:${min}.${sec}93Z`;
    console.log('ISO_string: ', ISO_string)
    if (this.state.check_in_date === '') {
      this.setState({
        checkIn_picked: !this.state.checkIn_picked,
        check_in_date: ISO_string
      });
    } else {
      this.setState({
        checkOut_picked: !this.state.checkOut_picked,
        check_out_date: ISO_string
      });
    }
  }
};
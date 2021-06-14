module.exports = {

  bookingCalculations: (inNumb, outNumb, checkinstring, checkoutstring) => {
    //input types:
      //check in date number,
      //check out date number,
      //check in date string (06/20/21),
      //check out date string (06/23/21)
    let range = [];
    const total_days = (outNumb - inNumb);
    const inMonth = checkinstring.slice(0, 2);
    const outMonth = checkinstring.slice(0, 2);
    for (let i = (inNumb + 1); i < outNumb; i++) {
      range.push(i);
    }
    let strRange = [];
    strRange.push(checkinstring);
    range.forEach(day => {
      let str = '';
      if (inMonth === outMonth) {
        str += `${inMonth}`;
        if (day <= 9) {
          str += `/0${day}/21`;
        } else {
          str += `/${day}/21`;
        }
      } else {
        str += `${outMonth}`;
        if (day <= 9) {
          str += `/0${day}/21`;
        } else {
          str += `/${day}/21`;
        }
      }
      strRange.push(str)
    });
    let weeknight_count = 0;
    strRange.push(checkoutstring);
    strRange.forEach(str => {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      let day = new Date(str).toLocaleString('en-us', {weekday:'long'});
      if (weekdays.indexOf(day) > -1) {
        weeknight_count ++;
      }
    })
    const discount = (this.state.weeknight_discount * this.state.average_price_per_night);
    const discount_applied_to_night = (this.state.average_price_per_night - discount);
    const discountedSubTotal = (discount_applied_to_night * weeknight_count);
    let subTotal = 0;
    if (weeknight_count === strRange.length) {
      subTotal = discountedSubTotal;
    } else {
      let diff = (strRange.length - weeknight_count);
      while (diff > 0) {
        subTotal += this.state.average_price_per_night;
        diff --;
      }
    }
    subTotal = Math.floor(subTotal);
    console.log('subTotal: ', subTotal)
    const calculated_average_price_per_night = Math.floor(subTotal / total_days);
    const calculated_average_price_x_days = Math.floor(calculated_average_price_per_night * total_days);
    const total = Math.floor(subTotal + this.state.cleaning_fee);
    let isoIn =  this.isoMaker(this.state.checkin_string);
    console.log('inISO: ', isoIn)
    let isoOut = this.isoMaker(this.state.checkin_string);
    console.log('outISO: ', isoOut)
    this.setState({
      isoIn: isoIn,
      isoOut: isoOut,
      discount: discount,
      discount_applied_to_night: discount_applied_to_night,
      discountedSubTotal: discountedSubTotal,
      calculated_average_price_per_night: calculated_average_price_per_night,
      calculated_average_price_x_days: calculated_average_price_x_days,
      total_days: total_days,
      subTotal: subTotal,
      total: total
    });
  }
};
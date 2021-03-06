import '../styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import config from '../../config.js';

import Calendar from './components/Calendar.jsx';
import Guests from './components/Guests.jsx';
import BookingButton from './components/BookingButton.jsx';
import BookingTotal from './components/BookingTotal.jsx';
class Booking extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      campId: 0,
      today: '',
      average_price_per_night: 0,
      how_far_out: 0,
      weeknight_discount: 0,
      instant_book: false,
      cleaning_fee: 0,
      max_guests: 0,
      current_month: 0, //numb
      booked: [],
      updateCheckIn: false,
      updateCheckOut: false,
      discount: 0,
      discount_applied_to_night: 0,
      discountedSubTotal: 0,
      calculated_average_price_per_night: 0,
      calculated_average_price_x_days: 0,
      check_in_clicked: false,
      check_out_clicked: false,
      checkIn_picked: false,
      checkOut_picked: false,
      check_in_date: '',
      check_out_date: '',
      checkin_string: '',
      checkout_string: '',
      range: [],
      check_in_date_numb: 0,
      check_out_date_numb: 0,
      book_button: false,
      guests: 2,
      total_days: 0,
      average_price_X_nights: 0,
      subTotal: 0,
      total: 0,
      isoIn: '',
      isoOut: '',
      bookingInit: false
    };

    this.init= this.init.bind(this);
    this.click = this.click.bind(this);
    this.update= this.update.bind(this);
    this.bookingTotal = this.bookingTotal.bind(this);
    this.bookingCalculations = this.bookingCalculations.bind(this);
    this.submit = this.submit.bind(this);
    this.updateCheckOut = this.updateCheckOut.bind(this);
    this.isoMaker = this.isoMaker.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    // const mode = process.env.NODE_ENV;
    // let url = '';
    // if (!process.env.NODE_ENV || mode === 'development') {
    //   url += config.development.booking;
    // } else {
    //   url += config.production.booking;
    // }
    // console.log('url: ', url);
    // axios.get(`${url}/booking`)
    axios.get(`/booking`)
    .then(({data}) => {
      console.log('data: ', data)
      const {
        campId,
        average_price_per_night,
        how_far_out,
        weeknight_discount,
        instant_book,
        cleaning_fee,
        max_guests,
        current_month,
        booked
      } = data;
      const today = moment().format().slice(8, 10);
      this.setState({
        campId,
        today,
        average_price_per_night,
        how_far_out,
        weeknight_discount,
        instant_book,
        cleaning_fee,
        max_guests,
        current_month,
        booked
      });
    })
    .catch((err) => {
      this.setState({
        campId: 0,
        today: moment().format().slice(8, 10),
        average_price_per_night: 165,
        how_far_out: 6,
        weeknight_discount: 0.2,
        instant_book: true,
        cleaning_fee: 15,
        max_guests: 6,
        current_month: 6,
        booked: [[2, 3, 4, 16, 17, 18, 26, 27, 28, 29, 30], [3, 4, 5, 17, 18, 19, 27, 28, 29, 30, 31], [4, 5, 6, 18, 19, 20, 28, 29, 30, 31, 1], [5, 6, 7, 19, 20, 21, 29, 30, 31, 1, 2], [6, 7, 8, 20, 21, 22, 30, 31, 1, 2, 3], [7, 8, 9, 21, 22, 23, 31, 1, 2, 3, 4]]
      });
    });
  }


  click(e) {
    e.preventDefault();
    if (e.target.innerHTML === "Check in") {
      if (!this.state.checkIn_picked) {
        if (this.state.check_out_clicked) {
          this.setState({
            check_in_clicked: !this.state.check_in_clicked,
            check_out_clicked: !this.state.check_out_clicked
          });
        } else {
          this.setState({
            check_in_clicked: !this.state.check_in_clicked
          });
        }
      } else if (this.state.checkIn_picked && this.state.checkOut_picked) {
        this.setState({
          checkIn_picked: !this.state.checkIn_picked,
          checkOut_picked: !this.state.checkOut_picked,
          check_out_date: '',
          checkout_string: '',
          check_out_date_numb: 0,
          check_in_date: '',
          checkin_string: '',
          check_in_date_numb: 0
        });
      } else if (this.state.checkIn_picked && !this.state.checkOut_picked) {
        this.setState({
          checkIn_picked: !this.state.checkIn_picked,
          checkOut_picked: !this.state.checkOut_picked,
          check_in_date: '',
          checkin_string: '',
          check_in_date_numb: 0,
          check_out_date: '',
          checkout_string: '',
          check_out_date_numb: 0
        });
      }
    } else if (e.target.innerHTML === "Check out") {
      if (!this.state.checkIn_picked) {
        this.setState({
          check_in_clicked: !this.state.check_in_clicked
        });
      } else if (this.state.checkIn_picked && this.state.checkOut_picked) {
        this.setState({
          checkOut_picked: !this.state.checkOut_picked,
          check_out_date: '',
          checkout_string: '',
          check_out_date_numb: 0,
        });
      } else if (this.state.checkIn_picked) {
        this.setState({
          check_out_clicked: !this.state.check_out_clicked
        });
      }
    }
  }

  submit(e, guests) {
    e.preventDefault();
    const new_guests_numb = Number(guests);
    this.setState({
      guests: new_guests_numb
    });
  }

  isoMaker = function(date) {
    let month = date.slice(0, 2);
    let day = date.slice(3, 5);
    const hour = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const min = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const sec = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const h = hour(0, 23);
    const m = min(0, 59);
    const s = sec(0, 60);
    const str =`2021-${month}-${day}T${h}:${m}.${s}Z`;
    return str;
  };

  updateCheckOut(e) {
    e.preventDefault();
    console.log('inside updat checkout');
    this.state({
      showCheckOut: !this.state.showCheckOut
    })
  }

  update(checkInMonth_string, checkDay, month_numb) {
    const date = checkInMonth_string + ' ' + checkDay;
    let str =  '';
    if (month_numb <= 9) {
      str += `0${month_numb}`;
    } else {
      str += `${month_numb}`;
    }
    if (checkDay <= 9) {
      str += `/0${checkDay}/21`;
    } else {
      str += `/${checkDay}/21`;
    }
    if (this.state.check_in_date === '') {
      this.setState({
        checkIn_picked: !this.state.checkIn_picked,
        check_in_date: date,
        check_in_date_numb: checkDay,
        checkin_string: str
      });
    } else {
      this.setState({
        checkOut_picked: !this.state.checkOut_picked,
        check_out_date: date,
        check_out_date_numb: checkDay,
        checkout_string: str
      });
      this.bookingCalculations(this.state.check_in_date_numb, checkDay, this.state.checkin_string, str)
    }
  }

  bookingCalculations(inNumb, outNumb, checkinstring, checkoutstring) {
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
    let weeknight_count = -1;
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
    if (weeknight_count === (strRange.length - 1)) {
      subTotal = discountedSubTotal;
    } else {
      let diff = (strRange.length - weeknight_count);
      console.log('strRange.length: ', strRange.length)
      console.log('diff: ', diff)
      while (diff > 0) {
        subTotal += this.state.average_price_per_night;
        diff --;
      }
    }
    subTotal = Math.floor(subTotal);
    const calculated_average_price_per_night = Math.floor(subTotal / total_days);
    const calculated_average_price_x_days = Math.floor(calculated_average_price_per_night * total_days);
    const total = Math.floor(subTotal + this.state.cleaning_fee);
    let isoIn =  this.isoMaker(this.state.checkin_string);
    let isoOut = this.isoMaker(this.state.checkin_string);
    if (this.state.bookingInit) {
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
      total: total,
      bookingInit: !this.state.bookingInit
    });
  }

  bookingTotal() {
    // const mode = process.env.NODE_ENV;
    // let url = '';
    // if (mode === 'development') {
    //   url += config.development.booking;
    // } else {
    //   url += config.production.booking;
    // }
    // return axios.get(`${url}bookingTotal`, { params: {
    return axios.get(`/bookingTotal`, { params: {
      campId: this.state.campId,
      check_in_date: this.state.isoIn,
      check_out_date: this.state.isoOut,
      number_nights: this.state.total_days,
      subTotal: this.state.subTotal,
      total: this.state.total
      }
    })
    .then(({data}) => {
      console.log(data)
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    if (this.state.checkOut_picked && this.state.bookingInit) {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="pricing-container">
                  <div className="nightly-pricing-container">
                    <div className="price-banner">
                      <div>
                        <h5 className="nightly-price">${this.state.calculated_average_price_per_night}</h5>
                        <span>per night ({this.state.guests} guests)</span>
                      </div>
                      <div className="hidden">
                        <button className="btn btn-primary btn-flashy book-cta"></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="well">
                  <div className="well-content dates-and-guests">
                    <div className="row">
                      <div className="col-xs-6 check-in-btn">
                        <div className="label" onClick={this.click}>Check in</div>
                        <span className="value" onClick={this.click}>{this.state.check_in_date}</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label" onClick={this.click}>Check out</div>
                        <span className="value" onClick={this.click}>{this.state.check_out_date}</span>
                      </div>
                    </div>
                    <div>
                      <Guests
                        guests={this.state.max_guests}
                        onSubmit={this.submit}
                      />
                    </div>
                    <div>
                      <BookingTotal
                      calculated_average_price_x_days={this.state.calculated_average_price_x_days}
                      number_nights={this.state.total_days}
                      average_price_X_nights={this.state.calculated_average_price_per_night}
                      cleaning_fee={this.state.cleaning_fee}
                      subTotal={this.state.subTotal}
                      total={this.state.total}
                      bookingTotal={this.bookingTotal}
                      />
                    </div>
                  </div>
                </div>
              </div>
          </aside>
        </div>
      );
    }
    if (this.state.check_out_clicked || this.state.checkIn_picked || this.state.updateCheckOut) {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="pricing-container">
                  <div className="nightly-pricing-container">
                    <div className="price-banner">
                      <div>
                        <h5 className="nightly-price">${this.state.average_price_per_night}</h5>
                        <span>per night ({this.state.guests} guests)</span>
                      </div>
                      <div className="hidden">
                        <button className="btn btn-primary btn-flashy book-cta"></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="well">
                  <div className="dates-and-guests">
                    <div className="row">
                      <div className="col-xs-6 check-in-btn">
                        <div className="label" onClick={this.click}>Check in</div>
                        <span className="value" onClick={this.click}>{this.state.check_in_date}</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label clicked">Check out</div>
                        <span className="value clicked">Select date</span>
                      </div>
                    </div>
                    <div className="row">
                      <Calendar
                      check_out_clicked={this.state.check_out_clicked}
                      current_month={this.state.current_month}
                      checkIn={this.state.check_in_date}
                      checkInNumb={this.state.check_in_date_numb}
                      campId={this.state.campId}
                      inventory={this.state.booked}
                      onSubmit={this.handleSubmit}
                      update={this.update}
                      />
                    </div>
                    <div>
                      <Guests
                        guests={this.state.max_guests}
                        onSubmit={this.submit}
                      />
                    </div>
                  </div>
                </div>
              </div>
          </aside>
        </div>
      );
    } else if (this.state.check_in_clicked) {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="pricing-container">
                  <div className="nightly-pricing-container">
                    <div className="price-banner">
                      <div>
                        <h5 className="nightly-price">${this.state.average_price_per_night}</h5>
                        <span>per night ({this.state.guests} guests)</span>
                      </div>
                      <div className="hidden">
                        <button className="btn btn-primary btn-flashy book-cta"></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="well open">
                  <div className="dates-and-guests">
                    <div className="row">
                      <div className="col-xs-6 check-in-btn">
                        <div className="label clicked">Check in</div>
                        <span className="value clicked">Select date</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label" onClick={this.click}>Check out</div>
                        <span className="value" onClick={this.click}>Select date</span>
                      </div>
                    </div>
                    <div className="row">
                      <Calendar
                        check_out_clicked={this.state.check_out_clicked}
                        current_month={this.state.current_month}
                        today={this.state.today}
                        campId={this.state.campId}
                        inventory={this.state.booked}
                        submit={this.handleSubmit}
                        update={this.update}
                      />
                    </div>
                  </div>
                </div>
              </div>
          </aside>
        </div>
    );
  } else {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="pricing-container">
                  <div className="nightly-pricing-container">
                    <div className="price-banner">
                      <div>
                        <h5 className="nightly-price">${this.state.average_price_per_night}</h5>
                        <span>per night ({this.state.guests} guests)</span>
                      </div>
                      <div className="hidden">
                        <button className="btn btn-primary btn-flashy book-cta"></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="well">
                  <div className="dates-and-guests">
                    <div className="row">
                      <div className="col-xs-6 check-in-btn">
                        <div className="label" onClick={this.click}>Check in</div>
                        <span className="value" onClick={this.click}>Select date</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label" onClick={this.click}>Check out</div>
                        <span className="value" onClick={this.click}>Select date</span>
                      </div>
                    </div>
                    <Guests
                      guests={this.state.max_guests}
                      onSubmit={this.submit}
                    />
                  </div>
                    <BookingButton bookingType={this.state.instant_book} />
                </div>
              </div>
          </aside>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Booking />,
  document.getElementById('booking')
);


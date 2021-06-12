import '../styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import config from '../../config.js';

import CheckInCal from './components/CheckInCal.jsx';
import CheckOutCal from './components/CheckOutCal.jsx';
import Guests from './components/Guests.jsx';
import BookingButton from './components/BookingButton.jsx';
import BookingTotal from './components/BookingTotal.jsx';
class Booking extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      campId: 0,
      updateCheckIn: false,
      updateCheckOut: false,
      today: '',
      average_price_per_night: 0,
      discounted_night: 0,
      discount_applied_to_night: 0,
      discountedSubTotal: 0,
      calculated_average_price_per_night: 0,
      calculated_average_price_x_days: 0,
      how_far_out: 0,
      weeknight_discount: 0,
      instant_book: false,
      cleaning_fee: 0,
      max_guests: 0,
      current_month: 0,
      month_string: '',
      inventory: [],
      check_in_clicked: false,
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
      Total: 0
    };

    this.init= this.init.bind(this);
    this.click = this.click.bind(this);
    this.update= this.update.bind(this);
    this.bookingTotal = this.bookingTotal.bind(this);
    this.bookingCalculations = this.bookingCalculations.bind(this);
    this.submit = this.submit.bind(this);
    this.updateCheckIn = this.updateCheckIn.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const mode = process.env.NODE_ENV;
    let url = '';
    if (mode === 'development') {
      url += config.development.booking;
    } else {
      url += config.production.booking;
    }
    axios.get(`${url}/booking`)
    .then(({data}) => {
      const {
        campId,
        average_price_per_night,
        how_far_out,
        weeknight_discount,
        instant_book,
        cleaning_fee,
        max_guests,
        current_month,
        inventory
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
        inventory
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  click(e) {
    e.preventDefault();
    this.setState({
      check_in_clicked: !this.state.check_in_clicked
    })
  }

  submit(e, guests) {
    e.preventDefault();
    const new_guests_numb = Number(guests);
    this.setState({
      guests: new_guests_numb
    });
  }

  updateCheckIn(e) {
    console.log('inside updte checkin')
    e.preventDefault();
    if (this.state.checkIn_picked) {
      this.setState({
        checkOut_picked: !this.state.checkOut_picked,
        updateCheckOut: !this.state.updateCheckOut,
        check_out_date: '',
        checkout_string: '',
        check_out_date_numb: 0
      });
    } else if (this.state.checkOut_picked) {
      this.setState({
        checkOut_picked: !this.state.checkOut_picked,
        checkIn_picked: !this.state.checkIn_picked,
        updateCheckIn: !this.state.updateCheckIn,
        check_in_date: '',
        checkin_string: '',
        check_in_date_numb: 0
      });
    } else {
      this.setState({
        checkIn_picked: !this.state.checkIn_picked,
        updateCheckIn: !this.state.updateCheckIn,
        check_in_date: '',
        checkin_string: '',
        check_in_date_numb: 0
      });
    }
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
    const total_days = (outNumb - inNumb);
    const inMonth = checkinstring.slice(0, 2);
    const outMonth = checkinstring.slice(0, 2);
    let range = [];
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
    const discounted_night = (this.state.weeknight_discount * this.state.average_price_per_night);
    const discount_applied_to_night = (this.state.average_price_per_night - discounted_night);
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
    const calculated_average_price_per_night = Math.floor(subTotal / total_days);
    const calculated_average_price_x_days = Math.floor(calculated_average_price_per_night * total_days);
    const total = Math.floor(subTotal + this.state.cleaning_fee);
    this.setState({
      discounted_night: discounted_night,
      discount_applied_to_night: discount_applied_to_night,
      discountedSubTotal: discountedSubTotal,
      calculated_average_price_per_night: calculated_average_price_per_night,
      calculated_average_price_x_days: calculated_average_price_x_days,
      discounted_night: discounted_night,
      total_days: total_days,
      subTotal: subTotal,
      total: total
    });
  }

  bookingTotal() {
    return axios.get('http://localhost:3002/booking/bookingTotal', { params: {
      campId: this.state.campId,
      booking: this.state.booking
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
    if (this.state.checkOut_picked) {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="pricing-container">
                  <div className="nightly-pricing-container">
                    <div className="price-banner">
                      <div>
                        <h5 className="nightly-price">${this.state.calculated_average_price_per_night}</h5>
                        <span className="perNight">per night ({this.state.guests} guests)</span>
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
                        <div className="label" onClick={this.updateCheckIn}>Check in</div>
                        <span className="value" onClick={this.updateCheckIn}>{this.state.check_in_date}</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label" onClick={this.updateCheckIn}>Check out</div>
                        <span className="value" onClick={this.updateCheckIn}>{this.state.check_out_date}</span>
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
                      />
                    </div>
                  </div>
                </div>
              </div>
          </aside>
        </div>
      );
    }
    if (this.state.checkIn_picked || this.state.updateCheckOut) {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="pricing-container">
                  <div className="nightly-pricing-container">
                    <div className="price-banner">
                      <div>
                        <h5 className="nightly-price">${this.state.average_price_per_night}</h5>
                        <span className="perNight">per night ({this.state.guests} guests)</span>
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
                        <div className="label" onClick={this.updateCheckIn}>Check in</div>
                        <span className="value" onClick={this.updateCheckIn}>{this.state.check_in_date}</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label clicked">Check out</div>
                        <span className="value clicked">Select date</span>
                      </div>
                    </div>
                    <div className="row">
                      <CheckOutCal
                      current_month={this.state.current_month}
                      checkIn={this.state.check_in_date}
                      checkInNumb={this.state.check_in_date_numb}
                      campId={this.state.campId}
                      inventory={this.state.inventory}
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
    } else if (this.state.check_in_clicked || this.state.updateCheckIn) {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="pricing-container">
                  <div className="nightly-pricing-container">
                    <div className="price-banner">
                      <div>
                        <h5 className="nightly-price">${this.state.average_price_per_night}</h5>
                        <span className="perNight">per night ({this.state.guests} guests)</span>
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
                        <div className="label clicked" onClick={this.click}>Check in</div>
                        <span className="value clicked" onClick={this.click}>Select date</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label">Check out</div>
                        <span className="value">Select date</span>
                      </div>
                    </div>
                    <div className="row">
                      <CheckInCal
                        current_month={this.state.current_month}
                        campId={this.state.campId}
                        inventory={this.state.inventory}
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
                        <span className="perNight">per night ({this.state.guests} guests)</span>
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
                        <div className="label">Check out</div>
                        <span className="value">Select date</span>
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


import '../styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import CheckInCal from './components/CheckInCal.jsx';
import CheckOutCal from './components/CheckOutCal.jsx';
import Guests from './components/Guests.jsx';
import BookingButton from './components/BookingButton.jsx';
import BookingTotal from './components/BookingTotal.jsx';

//Jun 08
class Booking extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      campId: 0,
      today: '',
      average_price_per_night: 0,
      discounted_night: 0,
      calculated_average_price_per_night: 0,
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
      guests: 0,
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
  }

  componentDidMount() {
    this.init();
  }

  init() {
    axios.get(`/booking`)
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

  checkOut(e) {
    e.preventDefault();
    //totl numb of dys
    //find out which dys of week booking occurs on
      //pply weeknight discount?
      //subtotl without clening fee
      //subtot w clening fee
    // const bookingTotal = {
    //   check_in_date: this.state.check_in_date,
    //   check_out_date: this.state.check_out_date,
    //   guests:
    //   Cleaningfee:,
    //   Subtotal:
    // };
    //update state with:
      //apply weeknight discount?
        // avg price per night (weenight discount applied)?
        //total_days
        // checkin
        // checkout
        // guests (can still modify)
        // Average price × 2 nights
        // Cleaning fee
        // Subtotal
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
      console.log('day: ', day);
      if (weekdays.indexOf(day) > -1) {
        weeknight_count ++;
      }
    })
    console.log('weeknight_count: ', weeknight_count);
    let discount = this.state.weeknight_discount;
    console.log('discount: ', discount)
    let discounted_night = (this.state.weeknight_discount * this.state.average_price_per_night);
    console.log('discounted_night: ', discounted_night);
    let subTotal = discount * (this.state.average_price_per_night * weeknight_count);
    let total = 0;
    if (weeknight_count === strRange.length) {
      total = subTotal;
    } else {
      let diff = (strRange.length - weeknight_count);
      while (diff > 0) {
        total += this.state.average_price_per_night;
        diff --;
      }
    }
    total += this.state.cleaning_fee;
    let calculated_average_price_per_night = (total / total_days);
    console.log('total: ', total)
    this.setState({
      calculated_average_price_per_night: calculated_average_price_per_night,
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
                        <span>per night (2 guests)</span>
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
                      <Guests guests={this.state.max_guests} />
                    </div>
                    <div>
                      <BookingTotal
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
    if (this.state.checkIn_picked) {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="pricing-container">
                  <div className="nightly-pricing-container">
                    <div className="price-banner">
                      <div>
                        <h5 className="nightly-price">${this.state.average_price_per_night}</h5>
                        <span>per night (2 guests)</span>
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
                        <span className="value">{this.state.check_in_date}</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label clicked" onClick={this.click}>Check out</div>
                        <span className="value clicked" onClick={this.click}>Select date</span>
                      </div>
                    </div>
                    <div>
                      <CheckOutCal
                      current_month={this.state.current_month}
                      checkIn={this.state.check_in_date}
                      campId={this.state.campId}
                      inventory={this.state.inventory}
                      onSubmit={this.handleSubmit}
                      update={this.update}
                      />
                    </div>
                    <div>
                      <Guests guests={this.state.max_guests} />
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
                        <span>per night (2 guests)</span>
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
                        <div className="label clicked" onClick={this.click}>Check in</div>
                        <span className="value clicked" onClick={this.click}>Select date</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label" onClick={this.click}>Check out</div>
                        <span className="value" onClick={this.click}>Select date</span>
                      </div>
                    </div>
                    <div>
                      <CheckInCal
                        current_month={this.state.current_month}
                        campId={this.state.campId}
                        inventory={this.state.inventory}
                        submit={this.handleSubmit}
                        update={this.update}
                      />
                    </div>
                    <div>
                      <Guests guests={this.state.max_guests} />
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
                        <span>per night (2 guests)</span>
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
                        <span className="value" onClick={this.click}>Select date</span>
                      </div>
                      <div className="col-xs-6 check-out-btn">
                        <div className="label" onClick={this.click}>Check out</div>
                        <span className="value" onClick={this.click}>Select date</span>
                      </div>
                    </div>
                    <div className="row datepickers">
                    </div>
                    <Guests guests={this.state.max_guests} />
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


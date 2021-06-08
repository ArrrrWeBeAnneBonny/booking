import '../styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import config from '../../server/config.js';

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
      average_price_per_night: 0,
      calculated_average_price_per_night: 0,
      how_far_out: 0,
      weeknight_discount: 0,
      instant_book: false,
      cleaning_fee: 0,
      max_guests: 0,
      current_month: 0,
      inventory: [],
      check_in_clicked: false,
      checkIn_picked: false,
      checkOut_picked: false,
      check_in_date: '',
      check_out_date: '',
      book_button: false,
      total_days: 0,
      average_price_X_nights: 0,
      subTotal: 0,
      Total: 0,
      initialized: false
    };

    this.init= this.init.bind(this);
    this.click = this.click.bind(this);
    this.makeISODate= this.makeISODate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.bookingTotal = this.bookingTotal.bind(this);
    this.checkOut = this.checkOut.bind(this);
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
      this.setState({
        campId,
        average_price_per_night,
        how_far_out,
        weeknight_discount,
        instant_book,
        cleaning_fee,
        max_guests,
        current_month,
        inventory,
        initialized: !this.state.initialized
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

  handleSubmit(e) {
    console.log('e: ', e);
    e.preventDefault();
    this.makeISODate();
    this.bookingTotal();
  }

  checkOut(e) {
    e.preventDefault();
    let bookingTotal = {};
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
        // Book button
  }

  makeISODate(day, month) {
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

  bookingTotal() {
    return axios.get('http://localhost:3002/booking/bookingTotal', { params: { campId: this.state.campId } })
    .then(({data}) => {
      console.log(data)
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    // console.log('picked: ', this.state.checkIn_picked)
    // console.log('in d: ', this.state.check_in_date)
    // console.log('picked: ', this.state.checkOut_picked)
    // console.log('out d: ', this.state.check_out_date)
    if (this.state.checkOut_picked) {
      return (
        <div>
          <aside className="booking-container">
            <div className="booking">
                <div className="banner-container">
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
                      average_price_X_nights={this.state.average_price_X_nights}
                      cleaning_fee={this.state.cleaning_fee}
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
                <div className="banner-container">
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
                    <div>
                      <CheckOutCal
                      month={this.state.current_month}
                      campId={this.state.campId}
                      inventory={this.state.inventory}
                      onSubmit={this.handleSubmit}
                      update={this.makeISODate}
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
                <div className="banner-container">
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
                    <div>
                      <CheckInCal
                        month={this.state.current_month}
                        campId={this.state.campId}
                        inventory={this.state.inventory}
                        submit={this.handleSubmit}
                        update={this.makeISODate}
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
                <div className="banner-container">
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
                      <div className="loading"></div>
                      <div className="inner"></div>
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


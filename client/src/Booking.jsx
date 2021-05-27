import '../styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import BookingButton from './components/BookingButton.jsx'
import CheckInAndOut from './components/CheckInAndOut.jsx';
import Guests from './components/Guests.jsx';

class Booking extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      campId: 0,
      price_per_night: 0,
      how_far_out: 0,
      weeknight_discount: 0,
      instant_book: false,
      cleaning_fee: 0,
      max_guests: 0,
      current_month: 0,
      inventory: [],
      check_in: '',
      check_out: '',
      average_price_X_nights: 0,
      subTotal: 0,
      Total: 0,
      mounted: false
    };

    this.init= this.init.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.book = this.book.bind(this);
    this.bookingTotal = this.bookingTotal.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: !this.state.mounted
    });
    this.init();
  }

  init() {
    // if (this.state.mounted) {
      (console.log('inside this.init'))
      axios.get('http://localhost:3002/booking')
      .then((res) => {
        let site = res.data;
        let instant = false;
        if (site.instant_book) {
          instant = true;
        }
        this.setState({
          name: site.name,
          campId: site.campId,
          price_per_night: site.price_per_night,
          how_far_out: site.how_far_out,
          weeknight_discount: site.weeknight_discount,
          instant_book: instant,
          cleaning_fee: site.cleaning_fee,
          max_guests: site.max_guests,
          initialized: !this.state.initialized
        });
      })
      .catch((err) => {
        throw err;
      });
    // }
  }

  handleClick(e) {
    console.log('e: ', e);
    e.preventDefault();
  }

  handleSubmit(e) {
    console.log('e: ', e);
    e.preventDefault();
    this.book(e);
  }

  //invoked when user clicks checkin button
  book() {
    axios.get('http://localhost:3002/booking/book', { params: { campId: 0 } })
    .then((res) => {
      let site = res.data;
      let month = site.month;
      let inventory = site.inventory;
      this.setState({
        current_month: site.month,
        inventory: site.inventory
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  //invoked when user clicks eligible checkout date
  bookingTotal() {
    // return axios.get('http://localhost:3002/booking/bookingTotal', { params: {
    //   campId: 0,
    //   check_in_date: this.state.check_in_date,
    //   check_out_date: this.state.check_in_date
    //   }
    // })
    //testing version:
    //make sure timestamps r coming in as dates I can parse
    let inTime = moment().format();
    let outTime = moment().format();
    return axios.get('http://localhost:3002/booking/bookingTotal', { params: {
      campId: 0,
      check_in_date: inTime,
      check_out_date: outTime
      }
    })
      .then((res) => {
        console.log('res: ', res);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    // if (this.state.mounted) {
      return (
        <div >
          <aside className="booking-widget-container">
            <div className="overlay" className="overlay-gray">
              <div className="booking-widget">
                <div className="loading-overlay">
                  <h5 className="price-container">${this.state.price_per_night}</h5>
                  <span>per night (2 guests)</span>
                </div>
              </div>
            </div>
          </aside>
            <CheckInAndOut campId={this.state.campId} click={this.handleClick} submit={this.handleSubmit}/>
            <Guests />
            <BookingButton bookingType={this.state.instant_book}/>
        </div>
      );
  }
}

ReactDOM.render(
  <Booking />,
  document.getElementById('booking')
);



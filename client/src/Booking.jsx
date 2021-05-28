import '../styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import CheckIn from './components/CheckIn.jsx';
import CheckOut from './components/CheckOut.jsx';
import Guests from './components/Guests.jsx';
import BookingButton from './components/BookingButton.jsx'
class Booking extends React.Component {

  constructor(props) {
    super(props);

    //add min-guests

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
      Total: 0
    };

    this.init= this.init.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.book = this.book.bind(this);
    this.bookingTotal = this.bookingTotal.bind(this);

  }

  componentDidMount() {
    this.init();
    this.book();//testing
    this.bookingTotal(); //testing
  }

  init() {
    axios.get('http://localhost:3002/booking')
    .then(({data}) => {
      console.log(data)
      const {
        name,
        campId,
        price_per_night,
        how_far_out,
        weeknight_discount,
        instant_book,
        cleaning_fee,
        max_guests,
      } = data;
      this.setState({
        name,
        campId,
        price_per_night,
        how_far_out,
        weeknight_discount,
        instant_book,
        cleaning_fee,
        max_guests,
      });
    })
    .catch((err) => {
      throw err;
    });
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
    .then(({data}) => {
      const {
        current_month,
        inventory
      } = data;
      this.setState({
        current_month,
        inventory
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
    const inTime = moment().format();
    const outTime = moment().format();
    return axios.get('http://localhost:3002/booking/bookingTotal', { params: {
      campId: 0,
      check_in_date: inTime,
      check_out_date: outTime
      }
    })
      .then(({data}) => {
        console.log('booking tot. data: ', data);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div className="booking">
        <aside>
          <div className="nightly-pricing-container">
            <div className="content">
              <h5 className="nightly-price">${this.state.price_per_night}
              <br></br><span className="per">per night (2 guests)</span>
              </h5>
            </div>
          </div>
          <div className="dates-and-guests">
            <div className="check-in-out-row">
              <div className="col-xs-6 col check-in-btn">
                <CheckIn campId={this.state.campId} click={this.handleClick} submit={this.handleSubmit} />
              </div>
              <div className="col-xs-6 col check-out-btn">
                <CheckOut campId={this.state.campId} click={this.handleClick} submit={this.handleSubmit} />
              </div>
            </div>
            <div className="guests">
              <Guests guests={this.state.max_guests} />
            </div>
          </div>
          <BookingButton bookingType={this.state.instant_book} />
        </aside>
      </div>
    );
  }
}

ReactDOM.render(
  <Booking />,
  document.getElementById('booking')
);


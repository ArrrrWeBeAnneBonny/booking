import React from 'react';
import ReactDOM from 'react-dom';
import BookingButton from './components/BookingButton.jsx'
import CheckInAndOut from './components/CheckInAndOut.jsx';
import Guests from './components/Guests.jsx';
import axios from 'axios';

//I need a way to replace calling my service directly
//i need a url variable
//depending on...call either proxy or service
//env variables
//default behavior = my service campId = 0
//special cases send to proxy
//use react router
//grab url off product itself

//get current month/day in call to init
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
      inventory: []
    };

    this.init= this.init.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.book = this.book.bind(this);
    this.bookingTotal = this.bookingTotal.bind(this);
  }

  componentDidMount() {
    this.init();
    this.bookingTotal(); //just right now for testing endpt 3
  }

  init() {
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
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.postData(event);
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
    return axios.get('http://localhost:3002/booking/bookingTotal', { params: {
      campId: 0,
      check_in_date: '5/23/21',
      check_out_date: '5/27/21'
      }
    })
      .then((res) => {
        console.log('res: ', res);
        // this.setState({
        // });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div className="widget-container">
        <h5 className="booking-widget__price">${this.state.price_per_night}</h5>
        <span>per night (2 guests)</span>
        <CheckInAndOut  submit={this.handleSubmit}/>
        <div className="btn.block">
        <div className="btn btn-primary">
          <BookingButton bookingType={this.state.instant_book}/>
        </div>
          </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Booking />,
  document.getElementById('booking')
);


// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);


import React from 'react';
import ReactDOM from 'react-dom';
import CheckIn from './components/CheckIn.jsx';
import CheckOut from './components/CheckOut.jsx';
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
    this.book = this.book.bind(this);
  }

  componentDidMount() {
    this.init();
    this.book();
  }

  init() {
    axios.get('http://localhost:3002/booking', { params: { campId: 0 } })
    .then((res) => {
      let site = res.data;
      console.log('site from /booking: ', site);
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

  book() {
    axios.get('http://localhost:3002/booking/book', { params: { campId: 0 } })
    .then((res) => {
      console.log('res: ', res);
      let site = res.data;
      console.log('site from booking/book: ', site);
      let month = res.data.month;
      let inventory = res.data.inventory;
      let instant = false;
      if (site.instant_book) {
        instant = true;
      }
      this.setState({
        current_month: site.month,
        inventory: site.inventory
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  render() {
    return (
      <div className="booking-widget hipbook" id="booking-widget">
        <div className="booking-widget__banner">
          <div className="wrapper">
            <div className=".booking-widget__standard-price-wrapper">
              <div>
                <h5 className="booking-widget__price">${this.state.pricePerNight}</h5>
                <span>per night (2 guests)</span>
              </div>
            </div>
          </div>
          <div className="col col-xs-6 check-in-btn" data-check-in-btn="">
            <div className="label"></div>
            <CheckIn />
            <span className="value">Select date</span>
          </div>
          <div className="col col-xs-6 check-out-btn" data-check-out-btn="">
            <div className="label"></div>
            <CheckOut />
            <span className="value">Select date</span>
          </div>
          <div></div>
          <div className="btn.block">
            <div className="btn btn-primary">
              {/* <BookingButton bookingType={this.state.bookingType}/> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class BookingButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.bookingType === 'request') {
      return (
        <div>
          <button></button>
        </div>
      );
    } else {
      return (
        <div>
          <button></button>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Booking />,
  document.getElementById('booking')
);

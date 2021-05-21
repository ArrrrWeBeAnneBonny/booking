import React from 'react';
import ReactDOM from 'react-dom';
import CheckIn from './components/CheckIn.jsx';
import CheckOut from './components/CheckOut.jsx';

//I need a way to replace calling my service directly
//i need a url variable
//depending on...call either proxy or service
//env variables
//default behavior = my service campId = 0
//special cases send to proxy

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingType: '',
      checkIn: false,
      checkOut: false,
      campId: 0,
      checkInDate: "",
      checkOutDate: "",
      cleaningFee: 0,
      howManyMonthsOutBookingCanBeMade: 0,
      month: 0,
      numberGuests: 0,
      numberNights: 0,
      pricePerNight: 0,
      weeknightDiscount: 0,
      year: 0
    };
    this.fetcher = this.fetcher.bind(this);
  }

  componentDidMount() {
    this.fetcher();
  }

  fetcher() {
    axios.get('/booking', { params: { campId: 0 } })
    .then((res) => {
      let site = res.data;
      console.log('site: ', site);
      let type = '';
      if (site.requestToBook) {
        type = 'request';
      } else {
        type = 'instant'
      }
      this.setState({
        bookingType: type,
        campId: site.campId,
        checkInDate: site.check_in_date,
        checkOutDate: site.check_out_date,
        cleaningFee: site.cleaning_fee,
        howManyMonthsOutBookingCanBeMade: site.how_many_months_out_booking_can_be_made,
        month: site.month,
        numberGuests: site.number_guests,
        numberNights: site.number_nights,
        pricePerNight: site.price_per_night,
        weeknightDiscount: site.weeknight_discount,
        year: site.year
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
              <BookingButton bookingType={this.state.bookingType}/>
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

//1 component per api route
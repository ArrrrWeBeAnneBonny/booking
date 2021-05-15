import React from 'react';
import ReactDOM from 'react-dom';
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
      console.log('this.state: ', this.state);
    })
    .catch((err) => {
      throw err;
    });
  }

  render() {
    <div>
      <BookingButton bookingType={this.state.bookingType}/>
    </div>
    let bookingType = this.state.requestToBook;
    if (bookingType) {
      return
    } else {
      return <InstantBook />;
    }
  }
}
class BookingButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (props.bookingType === 'request') {
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

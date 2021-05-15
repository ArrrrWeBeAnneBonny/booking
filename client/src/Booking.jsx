import React from 'react';
import ReactDOM from 'react-dom';
class Booking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkIn: false,
      checkOut: false,
      campId: 0,
      checkInDate: "",
      checkOutDate: "",
      cleaningFee: 0,
      howManyMonthsOutBookingCanBeMade: 0,
      instantBook: false,
      month: 0,
      numberGuests: 0,
      numberNights: 0,
      pricePerNight: 0,
      requestToBook: false,
      subTotal: 0,
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
      this.setState({
        campId: site.campId,
        checkInDate: site.check_in_date,
        checkOutDate: site.check_out_date,
        cleaningFee: site.cleaning_fee,
        howManyMonths_out_booking_can_be_made: site.how_many_months_out_booking_can_be_made,
        instantBook: site.instant_book,
        month: site.month,
        numberGuests: site.number_guests,
        numberNights: site.number_nights,
        pricePerNight: site.price_per_night,
        requestToBook: site.request_to_book,
        weeknightDiscount: site.weeknight_discount,
        year: site.year
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  render() {
    if (this.state.requestToBook) {
      return <RequestToBook />;
    } else if (this.state.instant_book) {
      return <InstantBook />;
    } else {
      return null;
    }
  }
}
class RequestToBook extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>RequestToBook</h1>
      </div>
    );
  }

}
class InstantBook extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>InstantBook</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <Booking />,
  document.getElementById('booking')
);


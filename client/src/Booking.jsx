import React from 'react';
import ReactDOM from 'react-dom';
class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: {
        init: false,
        campId: 0,
        check_in_date: "",
        check_out_date: "",
        cleaning_fee: 0,
        how_many_months_out_booking_can_be_made: 0,
        instant_book: false,
        month: 0,
        number_guests: 0,
        number_nights: 0,
        price_per_night: 0,
        request_to_book: false,
        subTotal: 0,
        weeknight_discount: 0,
        year: 0
      },
    };
  }

  componentDidMount() {
    axios.get('/booking', { params: { campId: 0 } })
    .then((res) => {
      let site = res.data;
      console.log('site: ', site);
      this.setState({
        campId: site.campId,
        check_in_date: site.check_in_date,
        check_out_date: site.check_out_date,
        cleaning_fee: site.cleaning_fee,
        how_many_months_out_booking_can_be_made: site.how_many_months_out_booking_can_be_made,
        instant_book: site.instant_book,
        month: site.month,
        number_guests: site.number_guests,
        number_nights: site.number_nights,
        price_per_night: site.price_per_night,
        request_to_book: site.request_to_book,
        weeknight_discount: site.weeknight_discount,
        year: site.year
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.perNightPrice}</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <Booking />,
  document.getElementById('booking')
);

//add Conditional rendering on App
  //instantBook or RequestToBook
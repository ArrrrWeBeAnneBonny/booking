import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
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
      .then(res => {
        console.log('res: ', res);
        this.setState({
          campId: res.campId,
          check_in_date: res.check_in_date,
          check_out_date: res.check_out_date,
          cleaning_fee: res.cleaning_fee,
          how_many_months_out_booking_can_be_made: res.how_many_months_out_booking_can_be_made,
          instant_book: res.instant_book,
          month: res.month,
          number_guests: res.number_guests,
          number_nights: res.number_nights,
          price_per_night: res.price_per_night,
          request_to_book: res.request_to_book,
          weeknight_discount: res.weeknight_discount,
          year: res.year
        });
      })
      .catch((err)=> {
        throw err;
      });
  }

  render() {
    return (
      <div>
        <h1>Booking Service</h1>
        <h2>{this.state.perNightPrice}</h2>
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
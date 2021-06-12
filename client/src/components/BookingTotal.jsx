import React from 'react';
import Guests from './Guests.jsx';

class BookingTotal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className=" bottom-content pricing">
          <ul className="summary">
            <li>
              <div className="summary-content">Average price x {this.props.number_nights} nights ${this.props.calculated_average_price_x_days}</div>
            </li>
            <li>
              <div className="summary-content">Cleaning fee ${this.props.cleaning_fee}</div>
            </li>
            <li>
              <div className="summary-content">Subtotal ${this.props.subTotal}</div>
            </li>
            <li>
              <div className="total">Total ${this.props.total}</div>
            </li>
          </ul>
        </div>
        <button onClick={this.props.bookingTotal} id="booking-btn" className="btn btn-block btn-primary btn-flashy" type="button">Book</button>
        <div className="notes">
          <div className="reminder-text">Don't worry, you won't be charged yet.</div>
        </div>
      </div>
    );
  }
}

export default BookingTotal;

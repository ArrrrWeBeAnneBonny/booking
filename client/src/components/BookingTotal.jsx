import React from 'react';
import Guests from './Guests.jsx';

class BookingTotal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="final-step">
        <div className="well-content pricing">
          <ul className="summary">
            <li>
              <div>Average price x {this.props.number_nights} nights</div>
              <div>${this.props.average_price_X_nights}</div>
            </li>
            <li>Cleaning fee
              <div>{this.props.cleaning_fee}</div>
            </li>
            <li className="subtotal-list-item s-fw--medium">Subtotal
              <div>{this.props.subTotal}</div>
            </li>
            <li className="subtotal-list-item s-fw--medium">Total
              <div>{this.props.total}</div>
            </li>
          </ul>
        </div>
        <button id="booking-btn" className="btn btn-block btn-primary btn-flashy" type="button">Book</button>
        <div className="notes">
          <div className="reminder-text">Don't worry, you won't be charged yet.</div>
        </div>
      </div>
    );
  }
}

export default BookingTotal;

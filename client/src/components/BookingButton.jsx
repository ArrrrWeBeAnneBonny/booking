import React from 'react';

class BookingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: false
    };
  }

  render() {
    if (this.props.bookingType) {
      return (
        <div className="final-step">
          <div className="submit well-content">
            <button id="booking-btn" className="btn btn-block btn-primary btn-flashy" type="button">Instant book</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="final-step">
          <div className="submit well-content">
            <button id="booking-btn" className="btn btn-block btn-primary btn-flashy" type="button">Request to book</button>
          </div>
        </div>
      );
    }
  }

}

export default BookingButton;
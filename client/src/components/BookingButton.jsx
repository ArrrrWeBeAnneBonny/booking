import React from 'react';

class BookingButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.bookingType) {
      return (
        <div>
          <button>Instant book</button>
        </div>
      );
    } else {
      return (
        <div>
          <button>Request to book</button>
        </div>
      );
    }
  }

}

export default BookingButton;
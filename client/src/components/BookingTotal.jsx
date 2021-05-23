import React from 'react';
import Guests from './Guests.jsx';

class BookingTotal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Guests />
      </div>
    );
  }
}

export default BookingTotal;

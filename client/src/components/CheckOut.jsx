import React from 'react';
import Guests from './Guests.jsx';
import CheckInCal from './CheckInCal.jsx';
import CheckOutCal from './CheckOutCal.jsx';

class CheckOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkIn_clicked: false,
      checkIn_picked: false,
      check_in_date: '',
      check_out_date: ''
    };

    this.click = this.click.bind(this);
  }

  click(e) {
    e.preventDefault();
    console.log('checkin button clicked: ', e);
    this.setState({
      checkIn_clicked: !this.state.checkIn_clicked
    });
  }

  render() {
    return (
      <div>
        <div className="label">Check out
        <span className="value">Select date</span>
        </div>
      </div>
    );

  }
}
//on click updte check in date in top-level app state and switch to checkout (checkin date highlighted in green)

export default CheckOut;

{/* <div className="label">Check out */}
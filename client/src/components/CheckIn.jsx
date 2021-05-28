import React from 'react';
import Guests from './Guests.jsx';
import CheckInCal from './CheckInCal.jsx';
import CheckOutCal from './CheckOutCal.jsx';

class CheckIn extends React.Component {
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
    if (this.state.checkIn_clicked) {
      return (
        <div>
          <CheckInCal />
        </div>
      );
    } else {
      return (
        <div>
          <div className="label">Check in
            <span className="value">Select date</span>
            <input></input>
          </div>
        </div>
      );
    }
  }
}
//on click updte check in date in top-level app state and switch to checkout (checkin date highlighted in green)

export default CheckIn;

//monthly calendar fills
//7 columns across
//6 rows down
//current day is automatically crossed off
{/* <input type="button" name="checkInButton" value="Check in" onClick={this.click}/> */}
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
          <div style={{backgroundColor: "#757575"}} className="label" onClick={this.click}>Check in</div>
          <span className="value" onClick={this.click}>Select date</span>
          <CheckInCal month={this.props.month} onClick={this.props.handleClick} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="label" onClick={this.click}>Check in</div>
          <span className="value" onClick={this.click}>Select date</span>
        </div>
      );
    }
  }
}
//on click updte check in date in top-level app state and switch to
//checkout (checkin date highlighted in green)

export default CheckIn;


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
    this.updateCheckInDate = this.updateCheckInDate.bind(this);
  }

  click(e) {
    e.preventDefault();
    console.log('checkin button clicked: ', e);
    this.props.book();
    this.setState({
      checkIn_clicked: !this.state.checkIn_clicked
    });
  }

  updateCheckInDate(day, month) {
      //"2011-12-19T15:28:46.493Z"
      console.log('inside updateCheckInDate')
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      const ISO_string =`2021-${month}-${day}T${hour}:${min}.${sec}93Z`;
      //don't set state here just pass checkindate back up to main?
    this.setState({
      checkIn_picked: !this.state.checkIn_picked,
      check_in_date: ISO_string
    });
    console.log('this.state: ', this.state)
  }

  render() {
    if (this.state.checkIn_picked) {
      console.log('show check out cal')
      return (
        <CheckOutCal />
      );
    } else if (this.state.checkIn_clicked) {
      return (
        <div>
          <div style={{backgroundColor: "#757575"}} className="label" onClick={this.click}>Check in</div>
          <span className="value" onClick={this.click}>Select date</span>
          <CheckInCal
          month={this.props.month}
          inventory={this.props.inventory}
          update={this.updateCheckInDate}
          onClick={this.props.handleClick}
          />
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


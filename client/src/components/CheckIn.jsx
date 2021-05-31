import React from 'react';
import Guests from './Guests.jsx';
import CheckInCal from './CheckInCal.jsx';
import CheckOutCal from './CheckOutCal.jsx';
import axios from 'axios';

class CheckIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.click = this.click.bind(this);
    this.book = this.book.bind(this);
    this.updateCheckInDate = this.updateCheckInDate.bind(this);
  }

  click(e) {
    e.preventDefault();
    console.log('checkin button clicked: ', e);
    this.setState({
      checkIn_clicked: !this.state.checkIn_clicked
    });
    this.book();
  }

  //invoked when user clicks checkin button
  book() {
    console.log('book invoked')
    axios.get('http://localhost:3002/booking/book', { params: { campId: 0 } })
    .then(({data}) => {
      const m = data.current_month
      const i = data.inventory;

      this.setState({
        current_month: m,
        inventory: i
      });
    })
    .catch((err) => {
      throw err;
    });
  }



  render() {
    if (this.state.checkIn_picked) {
      console.log('show check out cal')
      return (
        <CheckOutCal />
      );
    } else if (this.state.checkIn_clicked) {
      {console.log(this.state)}
      return (
        <div>
          <div style={{backgroundColor: "#757575"}} className="label" onClick={this.click}>Check in</div>
          <span className="value" onClick={this.click}>Select date</span>
          <CheckInCal
          month={this.state.current_month}
          inventory={this.state.inventory}
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


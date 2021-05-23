import React from 'react';
import Guests from './Guests.jsx';
import CheckInCal from './CheckInCal.jsx';
import CheckOutCal from './CheckOutCal.jsx';

class CheckInAndOut extends React.Component {
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

  // submit

  render() {
    if (this.state.checkIn_picked) {
      return (
        <div >
          <CheckOutCal onClick={this.props.click}/>
        </div>
      );
    } else if (this.state.checkIn_clicked) {
      return (
        <div>
          <CheckInCal />
        </div>
      );
    } else {
      return (
        <div >
          <div className="btn.block">
            <div className="btn btn-primary">
              <div className="check-in-btn">
                <input type="button" name="checkInButton" value="Check in" onClick={this.click}/>
              </div>
              <div className="check-out-btn">
                {/* <input type="button" name="checkOutButton" value="Check out" onSubmit={this.submit}/> */}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
//on click updte check in date in top-level app state and switch to checkout (checkin date highlighted in green)

export default CheckInAndOut;

//monthly calendar fills
//7 columns across
//6 rows down
//current day is automatically crossed off

{/* <div className="col col-xs-6 check-in-btn" data-check-in-btn="">
          <div className="label"></div>
            <button>Check in</button>
            // *use input type Date
          </div>
          <div className="col col-xs-6 check-out-btn" data-check-out-btn="">
            <div className="label"></div>
              <button>Check out</button>
          </div>
        <Guests /> */}
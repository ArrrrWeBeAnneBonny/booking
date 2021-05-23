import React from 'react';
import Guests from './Guests.jsx';
import CheckInCal from './CheckInCal.jsx';
class CheckInAndOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkIn_clicked: false,
      checkIn_picked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    // let check_in_date =
    // this.props.submit(check_in_date)
  }

  render() {
    if (this.state.checkIn_picked) {
      return (
        <div >
           {/* checkout calendar view
        </div>
      );
    } else if (!this.state.checkIn_clicked) {
      return (
        <div>
          {/* checkin calendar view */}
        </div>
      );
    } else {
      return (
        <div >
          <div className="btn.block">
            <div className="btn btn-primary">
              <div className="check-in-btn">
                <button onClick={this.handleClick}>Check in</button>
                {/* <CheckInCal onSubmit={this.props.submit}/> */}
              </div>
              <div className="check-out-btn">
                <button>Check out</button>
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
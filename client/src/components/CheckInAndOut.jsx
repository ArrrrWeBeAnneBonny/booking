import React from 'react';
import Guests from './Guests.jsx';
class CheckInAndOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="col col-xs-6 check-in-btn" data-check-in-btn="">
          <div className="label"></div>
            <button>Check in</button>
            // *use input type Date
          </div>
          <div className="col col-xs-6 check-out-btn" data-check-out-btn="">
            <div className="label"></div>
              <button>Check out</button>
          </div>
        <Guests />
      </div>
    );
  }
}
//on click updte check in date in top-level app state and switch to checkout (checkin date highlighted in green)

export default CheckInAndOut;

//monthly calendar fills
//7 columns across
//6 rows down
//current day is automatically crossed off
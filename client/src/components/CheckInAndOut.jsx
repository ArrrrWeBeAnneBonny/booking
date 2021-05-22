import React from 'react';

class CheckInAndOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button>Check in</button>
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
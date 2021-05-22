import React from 'react';

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button>Check in</button>
        <span className="value">Select date</span>
      </div>
    );
  }
}

export default CheckIn;

//monthly calendar fills
//7 columns across
//6 rows down
//current day is automatically crossed off
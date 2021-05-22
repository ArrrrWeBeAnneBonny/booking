import React from 'react';
class CheckOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button>Check out</button>
        <span className="value">Select date</span>
      </div>
    );
  }
}

export default CheckOut;

//monthly calendar fills
//7 columns across
//6 rows down
//current day is automatically crossed off
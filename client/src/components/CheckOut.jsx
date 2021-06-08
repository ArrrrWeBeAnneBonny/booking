import React from 'react';

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInDate: '',
      checkOutDate: ''
    }
    this.localClick = this.localClick.bind(this);
  }

  localClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="col-xs-6 check-out-btn">
       <div className="label" onClick={this.localClick}>Check out</div>
       <span className="value" onClick={this.localClick}>Select date</span>
     </div>
    );
  }
}

export default CheckOut;

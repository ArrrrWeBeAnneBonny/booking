import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 guests select">
          <div className="label">Guests</div>
          <span className="value">2 guests</span>
          <select name="group_size" id="group_size" className="invisible-input">
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5 guests</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Guests;

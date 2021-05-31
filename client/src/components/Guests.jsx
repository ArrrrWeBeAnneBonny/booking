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
        <div>
          <label>
          Guests
          </label>
        </div>
        <span className="value"></span>
        <select name="group_size" id="group_size" className="invisible-input" data-filter-select="">
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
          <option value="5">5 guests</option>
        </select>
      </div>
    );
  }
}

export default Guests;

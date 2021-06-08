import React from 'react';

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.localClick = this.localClick.bind(this);
  }

  localClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <div className="col-xs-6 check-in-btn">
        <div className="label" onClick={this.localClick}>Check in</div>
        <span className="value" onClick={this.localClick}>Select date</span>
      </div>
    );
  }
}

export default CheckIn;


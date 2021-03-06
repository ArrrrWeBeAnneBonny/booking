import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guest_numb: 2
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let guest = e.target.value;
    console.log('guest: ', guest);
    this.setState({
      guest_numb: guest
    });
    this.props.onSubmit(e, guest);
  }

  render() {
    return (
      <div className="row">
        <div className="guests">
          <div className="label">Guests</div>
          <div>
            <span className="value guests">{this.state.guest_numb} guests
              <select className="select" name="group_size" onChange={this.handleSubmit} id="select">
                <option defaultValue value></option>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Guests;

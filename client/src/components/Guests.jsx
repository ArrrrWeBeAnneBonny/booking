import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
        <label>
          Guests
          <select>
            <option> </option>
          </select>
        </label>
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Guests;
//select
import React from 'react';

class CheckInCal extends React.Component {
  constructor(props) {
    super(props);
    this.localClick = this.localClick.bind(this);
  }

  localClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr className="month">
              <th>
                <tr >
                  <th className="dow">S</th>
                  <th className="dow">M</th>
                  <th className="dow">T</th>
                  <th className="dow">W</th>
                  <th className="dow">TH</th>
                  <th className="dow">F</th>
                  <th className="dow">S</th>
                </tr>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td onClick={this.localClick} className="disabledDay">1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CheckInCal;

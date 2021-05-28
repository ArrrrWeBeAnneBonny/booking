import React from 'react';
import moment from 'moment';
class CheckInCal extends React.Component {
  constructor(props) {
    super(props);

    this.localClick = this.localClick.bind(this);
    this.convertMonthToString = this.convertMonthToString.bind(this);
    this.getSundays= this.getSundays.bind(this);
    this.createMonth = this.createMonth.bind(this);
  }

  localClick(e) {
    e.preventDefault();
  }

  convertMonthToString(month) {
    const months = ['January', "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"]
    let current = months[(month - 1)];
    return current;
  }

  getSundays(y) {
    const date = new Date(y, 0, 1);
    while (date.getDay() != 0) {
      date.setDate(date.getDate() + 1);
    }
    let days = [];
    while (date.getFullYear() == y) {
      const m = date.getMonth();
      const d = date.getDate();
      days.push(
        [(m < 10 ? m : m),
        (d < 10 ? d : d)]
      );
      date.setDate(date.getDate() + 7);
    }
    return days;
  };

  createMonth(t) {
    console.log('t: ', t)
    //populate 42 calendr cells
    //get total days in current month
    //get 42 - total
      //render table that fits extr days before and after current month of days
  }

  render() {
    //42 cells
    let s = 0;
    const hoy = moment().format('dddd');
    console.log('hoy: ', hoy);
    if (hoy === 'Sunday') {
      s = moment().format().slice(8, 10);
    }
    const month_numb = this.props.month;
    console.log('month_numb: ', month_numb)
    const month = this.convertMonthToString(this.props.month);
    console.log('month: ', month)
    let today = moment().format().slice(8, 10);
    console.log('today: ', today)
    const sundays = this.getSundays(2021);
    sundays.forEach(m => {
      console.log('m : ', m)
      if (m[0] === month_numb - 1) {
        console.log('in here')
        for (let i = 0; i < m.length; i++) {
          const min = today -= 7;
          console.log('min: ', min)
          const max = today += 7;
          console.log('max: ', max)
          if (m[i] > min && m[i] < max) {
            s = m[i];
            if (s > today) {
              s = m[i -1]
            }
          }
        }
      }
    })
    console.log('s: ', s)
    const inv = this.createMonth(today);
    return (
      <div id="date-picker">
        <table id="check-in-cal">
          <thead>
            <tr>
              <th>{month} 2021</th>
              <th className="next-month"></th>
            </tr>
            <tr >
              <th className="dow">S</th>
              <th className="dow">M</th>
              <th className="dow">T</th>
              <th className="dow">W</th>
              <th className="dow">TH</th>
              <th className="dow">F</th>
              <th className="dow">S</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="past day"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CheckInCal;

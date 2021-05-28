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

  getSundays(y, n) {
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

  createMonth(t, n) {
    let s = 0;
    let days = [];
    if (n === 2) {
      days = Array.from({length: 28}, (_, i) => i + 1);
    }
    let thirty = [4, 6, 9, 11];
    let thirtyOne = [1, 3, 5, 7, 8, 10, 12];
    if (thirty.indexOf(n) === -1) {
      days = Array.from({length: 31}, (_, i) => i + 1);
    } else {
      days = Array.from({length: 30}, (_, i) => i + 1);
    }
    const extra_days = 42 - (days.lenth - t);
    const sundays = getSundays(2021);
    let first;
    let inv = [];
    sundays.forEach(m => {
      if (!first) {
        first = m[1];
        for (let i = 0; i < m.length; i++) {
          console.log('m: ', m)
          const min = t -= 7;
          console.log('min: ', min)
          const max = t += 7;
          console.log('max: ', max)
          if (m[i] > min && m[i] < max) {
            s = m[i];
            if (s > t) {
              s = m[i -1]
            }
          }
        }
      }
    })
    //must begin on sun end on sat
    if (first === 1) {
      inv = days;
    }
    inv.push(first);
    let pre = [];
    let post = [];
    let i = first;
    let m = 42 - days.length;
    while (inv.length <= m) {
      inv.push(i ++);
    }
      //render table that fits extr days before and after current month of days
  }

  render() {
    const hoy = moment().format('dddd');
    console.log('hoy: ', hoy);
    if (hoy === 'Sunday') {
      s = moment().format().slice(8, 10);
    }
    const month_numb = this.props.month;
    console.log('month_numb: ', month_numb)
    const month = this.convertMonthToString(this.props.month);
    console.log('month: ', month)
    const today = moment().format().slice(8, 10);
    console.log('today: ', today)
    const inv = this.createMonth(today, month_numb);
    //map inventory into td cells
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




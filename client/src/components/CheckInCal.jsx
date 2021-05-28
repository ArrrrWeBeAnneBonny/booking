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
    const current = months[(month - 1)];
    return current;
  }

  createMonth(today, input_month) {
    let days = [];
    if (input_month === 2) {
      days = Array.from({length: 28}, (_, i) => i + 1);
    }
    let thirty = [4, 6, 9, 11];
    if (thirty.indexOf(input_month) === -1) {
      days = Array.from({length: 31}, (_, i) => i + 1);
    } else {
      days = Array.from({length: 30}, (_, i) => i + 1);
    }
    const length = days.length;
    const excess_days = (42 - length);
    const sundays = this.getSundays(2021);
    let prev_sundays_inventory = [];
    let next_sundays_inventory = [];
    sundays.forEach(month => {
      if (month[0] === (input_month - 1)) {
        for (let i = 0; i < month.length; i++) {
          if (i === 0) {
            if (month[i] === days[0]) {
              console.log('current month begins on a Sunday');
              if (length === 31) {
                days = days.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
              } else if (length === 31) {
                days = days.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
              } else {
                days = days.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
              }
              break;
            } 
          }
        }
      } 
      else if (month[0] === (input_month - 2)) {
        prev_sundays_inventory.push(month[1]);
      } else if (month[0] === (input_month)) {
        next_sundays_inventory.push(month[1]);
      }
    });
    let last_previous_sunday = prev_sundays_inventory.pop();
    let previous_month_length = 0;
    if (length === 31) {
      previous_month_length = 30;
    } else if (length === 30 || length === 28) {
      previous_month_length = 31;
    }
    let preLoad = [last_previous_sunday];
    let diff = (previous_month_length - last_previous_sunday);
    while (diff > 0) {
      let numb = last_previous_sunday += 1;
      preLoad.push(numb);
      diff --;
    }
    preLoad = preLoad.concat(days);
    const days_needed = (42 - preLoad.length);
    let next_days = [];
    next_days = Array.from({length: days_needed}, (_, i) => i + 1);
    preLoad = preLoad.concat(next_days);
    console.log(preLoad);
    return preLoad;
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
    const inventory = this.createMonth(today, month_numb);
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
              {inventory.map((numb, index) =>
              <td line={numb} key={index} className="day">{numb}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CheckInCal;

//monthly calendar fills
//7 columns across
//6 rows down
//current day is automatically crossed off
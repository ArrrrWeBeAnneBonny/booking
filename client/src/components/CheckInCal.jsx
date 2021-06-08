import React from 'react';
import moment from 'moment';
class CheckInCal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      today: '',
      booked: [],
      current_month_inventory: [],
      current_month_numb: 0,
      clicked_month_numb: 0,
      current_month_string: '',
      clicked_month_string: '',
      abbreviated_clicked_month_string: '',
      nextClicked: false
    };

    this.init = this.init.bind(this);
    this.click = this.click.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.prevClick = this.prevClick.bind(this);
    this.convertMonthToAbbreviatedString = this.convertMonthToAbbreviatedString.bind(this);
    this.convertMonthToString = this.convertMonthToString.bind(this);
    this.getSundays= this.getSundays.bind(this);
    this.createMonth = this.createMonth.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
  const today = moment().format().slice(8, 10);
  const current_month_string = this.convertMonthToString(this.props.current_month);
  const current_month_inventory = this.createMonth(today, this.props.current_month);
    this.setState({
      today: today,
      booked: this.props.inventory,
      current_month_inventory: current_month_inventory,
      current_month_numb: this.props.current_month,
      clicked_month_numb: 0,
      current_month_string: current_month_string,
      clicked_month_string: '',
      abbreviated_month_string: '',
    });
  }

  click(e) {
    e.preventDefault();
    const checkInDay = e.target.innerText;
    const checkInMonth_number = this.state.clicked_month_numb;
    const checkInMonth_string = this.convertMonthToString(checkInMonth_number);
    console.log('checkIndat: ', checkInDay, 'checkInMonth_number: ', checkInMonth_number, 'checkInMonth_string: ', checkInMonth_string )
    this.props.update(checkInMonth_string, checkInDay);
  }

  nextClick(e) {
    e.preventDefault();
    const newCurrentMonth = this.state.current_month_numb + 1;
    console.log('newCurrentMonth: ', newCurrentMonth)
    const newCurrentMonthtring = this.convertMonthToString(newCurrentMonth);
    console.log('newCurrentAbbreviatedMonthtring : ', newCurrentMonthtring)
    this.setState({
      current_month_numb: newCurrentMonth,
      current_month_string: newCurrentMonthtring,
      nextClicked: !this.state.nextClicked
    });
  }

  prevClick(e) {
    e.preventDefault();
    const newCurrentMonth = this.state.current_month_numb - 1;
    const newCurrentMonthtring = this.convertMonthToString(newCurrentMonth);
    this.setState({
      current_month_numb: newCurrentMonth,
      current_month_string: newCurrentMonthtring,
    });
  }

  convertMonthToAbbreviatedString(month) {
    const months = ['Jan', "Feb", "Mar", "Apr", "May", "Jun",  "Jul", "Aug", "Sep", "Oct", "Nov", "Dece"]
    const current = months[(month - 1)];
    return current;
  }

  convertMonthToString(month) {
    const months = ['January', "February", "March", "April", "May", "June",  "July", "August", "September",
    "October", "November", "December"]
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
  }

  // currentInventory() {
  //   const inventory = this.createMonth(today, month_numb);
  //   console.log('inventory: ', inventory);
  //   const week_one = inventory.slice(0, 7);
  //   const week_two = inventory.slice(7, 14);
  //   const week_three = inventory.slice(14, 21);
  //   const week_four = inventory.slice(21, 28);
  //   const week_five = inventory.slice(28, 35);
  //   const week_six = inventory.slice(35, 42);
  // }

  render() {
    console.log('checkin cal state: ', this.state);
    const prevStyle = {

    };
    const inventory = this.createMonth(this.state.today, this.state.current_month_numb);
    console.log('inventory: ', inventory);
    const week_one = inventory.slice(0, 7);
    const week_two = inventory.slice(7, 14);
    const week_three = inventory.slice(14, 21);
    const week_four = inventory.slice(21, 28);
    const week_five = inventory.slice(28, 35);
    const week_six = inventory.slice(35, 42);
    return (
      <div className="datepickers open">
        <div className="loading"></div>
        <div>
          <div className="datepicker-container" id="datepicker-container-check-in">
            <div className="datepicker datepicker-inline">
              <div className="datepicker-days">
                <table className="table-condensed">
                  <thead>
                    <tr>
                      {this.state.nextClicked && <th className="prev" onClick={this.prevClick}>prev</th>}
                      <th className="currentDatePickerMonth">{this.state.current_month_string} 2021</th>
                      <th onClick={this.nextClick} className="next">></th>
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
                    <tr onClick={this.click}>
                      {week_one.map((numb, index) =>
                        <td key={index} className="day" data-item={numb}>{numb}</td>
                      )}
                    </tr>
                    <tr onClick={this.click}>
                      {week_two.map((numb, index) =>
                        <td key={index} className="day" data-item={numb}>{numb}</td>
                      )}
                    </tr>
                    <tr onClick={this.click}>
                      {week_three.map((numb, index) =>
                        <td key={index} className="day" data-item={numb}>{numb}</td>
                      )}
                    </tr>
                    <tr onClick={this.click}>
                      {week_four.map((numb, index) =>
                        <td key={index} className="day" data-item={numb}>{numb}</td>
                      )}
                    </tr>
                    <tr onClick={this.click}>
                      {week_five.map((numb, index) =>
                        <td key={index} className="day" data-item={numb}>{numb}</td>
                      )}
                    </tr>
                    <tr onClick={this.click}>
                      {week_six.map((numb, index) =>
                        <td key={index} className="day" data-item={numb}>{numb}</td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckInCal;

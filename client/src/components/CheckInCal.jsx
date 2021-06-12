import React from 'react';
import moment from 'moment';
class CheckInCal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      june: 6,
      prev: ['<'],
      clicked: false,
      clickedStyle: '#40D9AC',
      today: moment().format().slice(8, 10),
      checkInDay: 0,
      totalDaysInMonth: 0,
      booked: this.props.inventory,
      current_month_inventory: [],
      current_month: this.props.current_month,
      current_month_numb: this.props.current_month,
      clicked_month_numb: 0,
      current_month_string: '',
      clicked_month_string: '',
      clicked_date: '',
      abbreviated_clicked_month_string: '',
      nextClicked: false,
      future: [],
      prev_month_unavailable: [],
      current_month_available: [],
      initialized: false
    };

    this.init = this.init.bind(this);
    this.click = this.click.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.prevClick = this.prevClick.bind(this);
    this.convertMonthToAbbreviatedString = this.convertMonthToAbbreviatedString.bind(this);
    this.convertMonthToString = this.convertMonthToString.bind(this);
    this.getSundays= this.getSundays.bind(this);
    this.createMonth = this.createMonth.bind(this);
    this.availableDays = this.availableDays.bind(this);
    this.getTotalDaysInMonth = this.getTotalDaysInMonth.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const today = moment().format().slice(8, 10);
    const current_month_string = this.convertMonthToString(this.props.current_month);
    const current_month_inventory = this.createMonth(today, this.props.current_month);
    const numb_today = Number(today);
    const today_index = current_month_inventory.indexOf(numb_today);
    const future = current_month_inventory.slice(today_index, current_month_inventory.length);
    const prev = current_month_inventory.slice(0, today_index);
    let future_copy = future.slice();
    const booked = this.props.inventory;
    const totalDaysInMonth = this.getTotalDaysInMonth(this.props.current_month);
    future_copy.forEach((el, index) => {
      if (booked[0].indexOf(el) > -1) {
        future_copy.splice(index, 1);
      }
    });
    this.setState({
      future: future,
      totalDaysInMonth: totalDaysInMonth,
      prev_month_unavailable: prev,
      current_month_available: future_copy,
      current_month_inventory: current_month_inventory,
      current_month_string: current_month_string,
      initialized: !this.state.initialized
    });
  }

  click(e) {
    e.preventDefault();
    const checkInDay = Number(e.target.innerText);
    this.setState({
      clicked: !this.state.clicked,
      checkInDay: checkInDay
    });
    const checkInMonth_string = this.convertMonthToString(this.state.current_month_numb);
    this.props.update(checkInMonth_string, checkInDay, this.state.current_month_numb);
  }

  nextClick(e) {
    console.log('inside next')
    e.preventDefault();
    const newCurrentMonth = this.state.current_month_numb + 1;
    const newCurrentMonthtring = this.convertMonthToString(newCurrentMonth);
    this.setState({
      current_month_numb: newCurrentMonth,
      current_month_string: newCurrentMonthtring,
      nextClicked: !this.state.nextClicked
    });
  }

  prevClick(e) {
    e.preventDefault();
    console.log('incoming this.state.current_month_numb: ', this.state.current_month_numb)
    const newCurrentMonth = this.state.current_month_numb - 1;
    console.log('prev curr month: ', newCurrentMonth)
    if (newCurrentMonth === this.state.june) {
      this.setState({
        nextClicked: !this.state.nextClicked,
        current_month_numb: newCurrentMonth,
        current_month_string: 'June'
      });
    } else {
      const newCurrentMonthtring = this.convertMonthToString(newCurrentMonth);
      console.log('prevnew :', newCurrentMonthtring)
      this.setState({
        current_month_numb: newCurrentMonth,
        current_month_string: newCurrentMonthtring,
      });
    }
  }

  getTotalDaysInMonth(month) {
    let days = 0;
    if (month === 2) {
      days = 28;
    }
    const thirty = [4, 6, 9, 11];
    const thirtyOne = [1, 3, 5, 7, 8, 10, 12];
    if (thirty.indexOf(month) === -1) {
      days = 31;
    } else {
      days = 30;
    }
    return days;
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
    let daysObjects = [];
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

  availableDays(booked, inventory) {
    const numb_today = Number(this.state.today);
    const today_index = inventory.indexOf(numb_today);
    const future = inventory.slice(today_index, inventory.length);
    let future_copy = future.slice();
    if (this.state.current_month === this.state.current_month_numb) {
      future_copy.forEach((el, index) => {
        if (booked[0].indexOf(el) > -1) {
          future_copy.splice(index, 1);
        }
      });
    } else {
      const diff = this.state.current_month_numb - this.this.state.current_month;
      future_copy.forEach((el, index) => {
        if (booked[diff].indexOf(el) > -1) {
          future_copy.splice(index, 1);
        }
      });
    }
    this.setState({
      future: future,
      current_month_available: future_copy

    });
    return future;
  }

  render() {
    let startPast = this.state.current_month_available[0];
    let endOfMonthIndex = this.state.current_month_inventory.lastIndexOf(this.state.totalDaysInMonth);
    const inventory = this.createMonth(this.state.today, this.state.current_month_numb);
    const week_one = inventory.slice(0, 7);
    const week_two = inventory.slice(7, 14);
    const week_three = inventory.slice(14, 21);
    const week_four = inventory.slice(21, 28);
    const week_five = inventory.slice(28, 35);
    const week_six = inventory.slice(35, 42);
    if (this.state.initialized && this.state.nextClicked) {
      return (
        <div>
          <div className="datepicker-container">
            <div className="currentDatePickerMonth next" onClick={this.nextClick} onClick={this.prevClick}>{this.state.prev} {this.state.current_month_string}
              2021 >
            </div>
            <table className="calendar">
              <thead>
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
                  {week_one.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || (numb < startPast) ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                    }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_two.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                     return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                     <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                     :
                     <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                     }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_three.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_four.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_five.map((numb, index) => {
                   if (numb === this.state.checkInDay) {
                     return <td key={index} className="selected" data-item={numb}>{numb}</td>
                   } else {
                     return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                     <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                     :
                     <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                     }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_six.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (this.state.initialized && this.state.clicked) {
      return (
        <div>
          <div className="datepicker-container">
            <div className="currentDatePickerMonth next" onClick={this.nextClick}>>{this.state.current_month_string}
              2021>
            </div>
            <table className="calendar">
              <thead>
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
                  {week_one.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                    }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_two.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                     return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                     <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                     :
                     <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                     }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_three.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_four.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_five.map((numb, index) => {
                   if (numb === this.state.checkInDay) {
                     return <td key={index} className="selected" data-item={numb}>{numb}</td>
                   } else {
                     return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                     <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                     :
                     <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                     }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_six.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (this.state.initialized) {
      return (
        <div className="datepickers">
          <div className="datepicker-container">
            <div className="currentDatePickerMonth next" onClick={this.nextClick}> {this.state.current_month_string}
               2021 >
            </div>
            <table className="calendar">
              <thead>
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
                  {week_one.map((numb, index) => {
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_two.map((numb, index) => {
                    this.state.numbers[numb] = 1;
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_three.map((numb, index) => {
                    this.state.numbers[numb] = 1;
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_four.map((numb, index) => {
                    this.state.numbers[numb] = 1;
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_five.map((numb, index) => {
                    this.state.numbers[numb] = 1;
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
                <tr onClick={this.click}>
                  {week_six.map((numb, index) => {
                    this.state.numbers[numb] = 1;
                    if (numb === this.state.checkInDay) {
                      return <td key={index} className="selected" data-item={numb}>{numb}</td>
                    } else {
                      return this.state.current_month_available.indexOf(numb) === -1 || numb < startPast ?
                      <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                      :
                      <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                      }
                    }
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }
  }

}

export default CheckInCal;

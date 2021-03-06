import React from 'react';
import moment from 'moment';
class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      check_out_clicked: this.props.check_out_clicked,
      current_month_booked: [],
      next_month_booked: [],
      currentFortyTwoDayMonth: [],
      this_month_days: [],
      preLoad: [],
      next_month_daze: [],
      future_available: [],
      totalAvailableThisFortyTwoDayPeriod: [],
      june: 6,
      clicked: false,
      monthChanged: false,
      clickedStyle: '#40D9AC',
      today: Number(this.props.today),
      checkInDay: 0,
      totalDaysInMonth: 0,
      newCurrentMonth: 0,
      oldCurrentMonth: 0,
      booked: this.props.inventory,
      current_month_numb: this.props.current_month,
      clicked_month_numb: 0,
      current_month_string: '',
      clicked_month_string: '',
      clicked_date: '',
      abbreviated_clicked_month_string: '',
      nextClicked: false,
      future: [],
      initialized: false,
      future_available: [],
      totalAvailableCurrMonth: [],
      previousDaysLeadingToToday: []
    };

    this.init = this.init.bind(this);
    this.click = this.click.bind(this);
    this.convertMonthToAbbreviatedString = this.convertMonthToAbbreviatedString.bind(this);
    this.convertMonthToString = this.convertMonthToString.bind(this);
    this.getSundays= this.getSundays.bind(this);
    this.createMonth = this.createMonth.bind(this);
    this.getTotalDaysInMonth = this.getTotalDaysInMonth.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init(x, y, z) {
    let current_month_booked,
        next_month_booked,
        currentFortyTwoDayMonth,
        previousDaysLeadingToToday,
        this_month_days,
        this_month_available
        = [];
    let current_month_string = '';
    let currentInventoryObj = {};
    let today_index = 0;
    if (!arguments.length) {
      current_month_booked = this.props.inventory[0];
      next_month_booked = this.props.inventory[1];
      current_month_string = this.convertMonthToAbbreviatedString(this.state.current_month_numb);
      currentInventoryObj = this.createMonth(this.state.today, this.state.current_month_numb);
      this_month_days = currentInventoryObj.this_month_days;
      currentFortyTwoDayMonth = currentInventoryObj.fortyTwoDayMonth;
      today_index = currentFortyTwoDayMonth.indexOf(this.state.today);
      previousDaysLeadingToToday = currentFortyTwoDayMonth.slice(0, today_index);
      this_month_available = this_month_days.filter(el => {
        if (current_month_booked.indexOf(el) === -1 && previousDaysLeadingToToday.indexOf(el) === -1) {
          return el;
        }
      });
    } else {
      let diff = 0;
      if (y < x) {
        diff = x - y;
      } else {
        diff = (y - x);
      }
      current_month_booked = this.props.inventory[diff];
      let next = (diff + 1);
      next_month_booked = this.props.inventory[next];
      current_month_string = this.convertMonthToAbbreviatedString(y);
      currentInventoryObj = this.createMonth(this.state.today, y);
      this_month_days = currentInventoryObj.this_month_days;
      currentFortyTwoDayMonth = currentInventoryObj.fortyTwoDayMonth;
      this_month_available = this_month_days.filter(el => {
        if (current_month_booked.indexOf(el) === -1) {
          return el;
        }
      });
    }
    const preLoad = currentInventoryObj.preLoad;
    const next_month_daze = currentInventoryObj.next_month_daze;
    const future = currentFortyTwoDayMonth.slice(today_index, currentFortyTwoDayMonth.length);
    const future_available = next_month_daze.filter(el => {
      if (next_month_booked.indexOf(el) === -1) {
        return el;
      }
    });
    const totalAvailableThisFortyTwoDayPeriod = this_month_available.concat(future_available);
    if (!this.state.initialized) {
      this.setState({
        previousDaysLeadingToToday: previousDaysLeadingToToday,
        current_month_booked: current_month_booked,
        next_month_booked: next_month_booked,
        current_month_string: current_month_string,
        currentFortyTwoDayMonth: currentFortyTwoDayMonth,
        this_month_days: this_month_days,
        preLoad: preLoad,
        next_month_daze: next_month_daze,
        future: future,
        future_available: future_available,
        totalAvailableCurrMonth: this_month_available,
        totalAvailableThisFortyTwoDayPeriod: totalAvailableThisFortyTwoDayPeriod,
        initialized: !this.state.initialized
      });
    } else if (this.state.initialized) {
      this.setState({
        oldCurrentMonth: x,
        newCurrentMonth: y,
        current_month_numb: y,
        previousDaysLeadingToToday: previousDaysLeadingToToday,
        current_month_booked: current_month_booked,
        next_month_booked: next_month_booked,
        current_month_string: current_month_string,
        currentFortyTwoDayMonth: currentFortyTwoDayMonth,
        this_month_days: this_month_days,
        preLoad: preLoad,
        next_month_daze: next_month_daze,
        future: future,
        future_available: future_available,
        totalAvailableCurrMonth: this_month_available,
        totalAvailableThisFortyTwoDayPeriod: totalAvailableThisFortyTwoDayPeriod
      });
    }
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

  changeMonth(e) {
    e.preventDefault();
    const button = e.target.id;
    const oldCurrentMonth = this.state.current_month_numb;
    let newCurrentMonth = 0;
    let newCurrentMonthtring = '';
    if (button === 'prev') {
      if (this.state.current_month_numb === 6) {
        return;
      }
      newCurrentMonth = (oldCurrentMonth - 1);
      if (newCurrentMonth === this.state.june) {
        this.init(oldCurrentMonth, newCurrentMonth, newCurrentMonthtring);
        this.setState({
          nextClicked: !this.state.nextClicked,
          current_month_numb: newCurrentMonth,
          current_month_string: 'June'
        });
      } else {
        newCurrentMonthtring += this.convertMonthToAbbreviatedString(newCurrentMonth);
        this.init(oldCurrentMonth, newCurrentMonth, newCurrentMonthtring);
      }
    }
    if (button === 'next') {
      newCurrentMonth = (oldCurrentMonth + 1)
      newCurrentMonthtring += this.convertMonthToAbbreviatedString(newCurrentMonth);
      this.init(oldCurrentMonth, newCurrentMonth, newCurrentMonthtring);
      if (!this.state.nextClicked) {
        this.setState({
        nextClicked: !this.state.nextClicked
        });
      }
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
    const months = ['Jan', "Feb", "Mar", "Apr", "May", "Jun",  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
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
    let result = {};
    let this_month_days = [];
    if (input_month === 2) {
      this_month_days = Array.from({length: 28}, (_, i) => i + 1);
    }
    let thirty = [4, 6, 9, 11];
    if (thirty.indexOf(input_month) === -1) {
      this_month_days = Array.from({length: 31}, (_, i) => i + 1);
    } else {
      this_month_days = Array.from({length: 30}, (_, i) => i + 1);
    }
    result.this_month_days = this_month_days;
    const length = this_month_days.length;
    const sundays = this.getSundays(2021);
    let prev_sundays_inventory = [];
    let next_sundays_inventory = [];
    let next_month_days = [];
    sundays.forEach(month => {
      if (month[0] === (input_month - 1)) {
        for (let i = 0; i < month.length; i++) {
          if (i === 0) {
            if (month[i] === this_month_days[0]) {
              console.log('current month begins on a Sunday');
              if (length === 31) {
                next_month_days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
              } else if (length === 31) {
                next_month_days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
              } else {
                next_month_days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
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
    const days_needed = (42 - preLoad.length - this_month_days.length);
    result.preLoad = preLoad;
    const thisAndPrevDays = preLoad.concat(this_month_days);
    let next_month_daze = [];
    next_month_daze = Array.from({length: days_needed}, (_, i) => i + 1);
    result.next_month_daze = next_month_daze;
    const fortyTwoDayMonth = thisAndPrevDays.concat(next_month_daze)
    result.fortyTwoDayMonth = fortyTwoDayMonth;
    return result;
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

  render() {
    const inventory = this.state.currentFortyTwoDayMonth;
    const week_one = inventory.slice(0, 7);
    const week_two = inventory.slice(7, 14);
    const week_three = inventory.slice(14, 21);
    const week_four = inventory.slice(21, 28);
    const week_five = inventory.slice(28, 35);
    const week_six = inventory.slice(35, 42);
    if (this.state.initialized && this.state.check_out_clicked) {
      return (
        <div>
          <div className="currentDatePickerMonth beforeprev"><div id="month">{this.state.current_month_string}</div><div id="year">2021</div><div id="next" onClick={this.changeMonth}></div>
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
                  let numbIndex = this.state.current_month_inventory.indexOf(numb);
                  if (numb === this.state.checkInNumb) {
                    return <td key={index} className="selected" data-item={numb}>{numb}</td>
                  } else {
                    return this.state.preLoad.includes(numb) || this.state.previousDaysLeadingToToday.includes(numb) ?
                    <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                    :
                    <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                  }
                }
              )}
              </tr>
              <tr onClick={this.click}>
                {week_two.map((numb, index) => {
                  let numbIndex = this.state.current_month_inventory.indexOf(numb);
                  if (numb === this.state.checkInNumb) {
                    return <td key={index} className="selected" data-item={numb}>{numb}</td>
                  } else {
                    return this.state.previousDaysLeadingToToday.includes(numb) || !this.state.totalAvailableCurrMonth.includes(numb) ?
                    <td key={index} className="unavailable" data-item={numb}>{numb}</td>
                    :
                    <td onClick={this.click} key={index} className="available" data-item={numb}>{numb}</td>
                    }
                  }
                )}
              </tr>
              <tr onClick={this.click}>
                {week_three.map((numb, index) => {
                  let numbIndex = this.state.current_month_inventory.indexOf(numb);
                  if (numb === this.state.checkInNumb) {
                    return <td key={index} className="selected" data-item={numb}>{numb}</td>
                  } else {
                    return !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.next_month_booked.includes(numb) ?
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
                      return !this.state.next_month_booked.includes(numb) ?
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
      );
  } else if (this.state.initialized && this.state.nextClicked) {
      return (
        <div>
          <div className="datepicker-container">
            <div id="prev" onClick={this.changeMonth}>{this.state.prev}<div className="currentDatePickerMonth" onClick={this.changeMonth}><div id="month">
              {this.state.current_month_string}</div><div id="year">2021</div><div id="next" onClick={this.changeMonth}>{this.state.next}</div>
              </div>
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
                      return !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                     return !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.next_month_booked.includes(numb) ?
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
                      return !this.state.next_month_booked.includes(numb) ?
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
    } else if (this.state.initialized && this.state.clicked) {
      return (
        <div>
          <div className="datepicker-container">
            <div className="currentDatePickerMonth beforeprev"><div id="month">{this.state.current_month_string}
              </div><div id="year">2021</div><div id="next" onClick={this.changeMonth}></div>
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
                      return this.state.preLoad.includes(numb) || this.state.previousDaysLeadingToToday.includes(numb) || !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                     return this.state.preLoad.includes(numb) || this.state.previousDaysLeadingToToday.includes(numb) || !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return this.state.previousDaysLeadingToToday.includes(numb) || !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.next_month_booked.includes(numb) ?
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
                      return !this.state.next_month_booked.includes(numb) ?
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
            <div className="currentDatePickerMonth beforeprev"><div id="month">{this.state.current_month_string}</div><div id="year">2021</div><div id="next" onClick={this.changeMonth}></div>
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
                      return this.state.preLoad.includes(numb) || this.state.previousDaysLeadingToToday.includes(numb) || !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return this.state.preLoad.includes(numb) || this.state.previousDaysLeadingToToday.includes(numb) || !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return this.state.previousDaysLeadingToToday.includes(numb) || !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.totalAvailableCurrMonth.includes(numb) ?
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
                      return !this.state.next_month_booked.includes(numb) ?
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
                      return !this.state.next_month_booked.includes(numb) ?
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

export default Calendar;
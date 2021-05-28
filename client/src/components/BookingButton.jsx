import React from 'react';

class BookingButton extends React.Component {
  constructor(props) {
    super(props);
  }
//add third option to press 'book'
  render() {
    //   {
    //   this.props.booked ? (
    //     return (<div id="booking-btn">
    //       <input type="button" name="instant_book" value="Book" onClick={this.click}/>
    //     </div>);
    //   ) : this.props.bookingType ? (
    //     return (
    //       <div id="booking-btn">
    //     <input type="button" name="instant_book" value="Instant book" onClick={this.click}/>
    //   </div>
    //     );
    //   ) : !this.props.bookingType ? (
    //     return (<div>
    //       <div id="booking-btn">Request to book
    //         <input type="button" name="request_to_book" value="Request to book" onClick={this.click}/>
    //       </div>
    //     </div>
    //     );
    //   ) : return (null);
    // }
    if (this.props.bookingType) {
      return (
        <div>
          <div id="booking-btn">
            <input type="button" name="instant_book" value="Instant book" onClick={this.click}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div id="booking-btn">Request to book
            <input type="button" name="request_to_book" value="Request to book" onClick={this.click}/>
          </div>
        </div>
      );
    }
  }

}

export default BookingButton;
import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonExampleAnimated = (props) => {
  if (props.bookingType === 'request') {
    return (
      <div>
        <Button animated>
          <Button.Content visible>Request to book</Button.Content>
          <Button.Content hidden>
          </Button.Content>
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button animated>
          <Button.Content visible>Instant book</Button.Content>
          <Button.Content hidden>
          </Button.Content>
        </Button>
      </div>
    );
  }
}

export default ButtonExampleAnimated;

{/* <BookingButton /> */}
// class BookingButton extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     if (this.props.bookingType === 'request') {
//       return (
//         <div>
//           <button>Request to book</button>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <button>Instant book</button>
//         </div>
//       );
//     }
//   }
// }
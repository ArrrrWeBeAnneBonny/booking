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

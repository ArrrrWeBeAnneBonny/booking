import React from 'react';
import ReactDOM from 'react-dom';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: []
    };
    this.fetcher = this.fetcher.bind(this);
  }

  componentDidMount() {
    console.log('hi');
    this.fetcher();
  }

  fetcher() {
    fetch("http://localhost:3002/booking")
      .then(response => {
        return response.json();
      })
      .then((res) => {
        console.log('res: ', res);
        this.setState({
          seed: res
        });
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    return (
      <div>
        <h1>Booking Service</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <Booking />,
  document.getElementById('booking')
);
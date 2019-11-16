import React from "react";
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'


class App extends React.Component {

  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message})
    );
    console.log('My component was rendered to the screen')
  };

  componentDidUpdate() {
    console.log('My component was just updated - it re-rendered!')
  };

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div>
          <img className="summer" class="ui medium circular image" src="https://i.pinimg.com/originals/24/8c/c4/248cc4eec11b158d6eaf49c7088022a4.jpg" />
          <h1>Error: {this.state.errorMessage}</h1>
        </div>
      )
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner message={"Patience is a Virtue"} />
  }

  render() {
    return(
      <div className="border-black">
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

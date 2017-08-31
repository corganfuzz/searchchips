import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import Searching from './Searching';

injectTapEventPlugin();

class App extends Component {

  yourCallback(searchResults) {
    console.log('searchResults are:', searchResults)
  }

  render() {
    return (
      <div className="App">
      <Searching
        apiKey = 'AIzaSyA8cOPpMYBZuZUStD7YVLYi_sq2kVXgMYA'
        callback = {this.yourCallback}
        />
      </div>
    );
  }
}

export default App;

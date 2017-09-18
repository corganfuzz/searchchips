import React, { Component } from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import "./App.css";
import Searching from "./Searching";

injectTapEventPlugin();

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults:''
    }
    this.yourCallback = this.yourCallback.bind(this);
  }

  yourCallback(searchResults) {
     this.setState({searchResults}) 
     console.log("searchResults", searchResults);
    }

  render() {



  // console.log ('this.props', this.props)
    return (
      <div className="App">
        <Searching
           callback={this.yourCallback}

        />

      <br/>

      {this.state.searchResults 
        ? 
        this.state.searchResults.map((r, k) => 
          <h1 key={k}>
            {r.id.videoId}
          </h1>) 
        : null
        }
      


      </div>
    );
  }
}

export default App;

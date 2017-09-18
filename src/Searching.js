import React, { Component } from "react";
// import { AutoComplete } from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import JSONP from "jsonp";
// import YoutubeFinder from "youtube-finder";
// import Chip from "material-ui/Chip";
import ChipInput from "material-ui-chip-input";

  const googleAutoSuggestURL = `
    //suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;
  const APIk = 'AIzaSyA8cOPpMYBZuZUStD7YVLYi_sq2kVXgMYA'
  const result = 4
  const realURL = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=${result}&key=${APIk}`
  

class Searching extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    
    // this.YoutubeClient = YoutubeFinder.createClient({ key: this.props.apiKey });
    
    this.state = {
      dataSource: [],
      inputValue: ""
    };
  }

  onUpdateInput(inputValue) {
    const self = this;

    this.setState(
      {
        inputValue: inputValue
      },
      function() {
        self.performSearch();
      }
    );
  }

  performSearch() {
    const self = this,
      url = googleAutoSuggestURL + this.state.inputValue;

    if (this.state.inputValue !== "") {
      JSONP(url, function(error, data) {
        let searchResults, retrievedSearchTerms;

        if (error) return error;

        searchResults = data[1];

        retrievedSearchTerms = searchResults.map(function(result) {
          return result[0];
        });

        self.setState({
          dataSource: retrievedSearchTerms
        });
      });
    }
  }



  onNewRequest(searchTerm) {
    const self = this,
          lastURL = `${realURL}&q=${this.state.inputValue}`;

    fetch (lastURL)
      .then((response) => response.json())
        .then((results) => {
          // console.log('res', results.items)
          // const apps = results.items.map(obj => obj.id);
          self.props.callback(results.items, searchTerm)
          self.setState({
              dataSource: [],
              inputValue: self.state.inputValue
          });
        })
        .catch((error) => {
          console.error(error);
        })

  }


  render() {
    // console.log (this.props)
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <br />
          <br />
          <ChipInput
            fullWidth={true}
            dataSource={this.state.dataSource}
            onUpdateInput={this.onUpdateInput}
            onChange={this.onNewRequest}
          />

          {/* <h3>apps: {this.state.apps}</h3> */}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default Searching;

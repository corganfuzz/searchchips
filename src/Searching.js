import React, { Component } from "react";
import { AutoComplete } from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import JSONP from "jsonp";
// import YoutubeFinder from "youtube-finder";
import Chip from "material-ui/Chip";
import ChipInput from "material-ui-chip-input";
import Profile from './components/Profile';
import Toggle from 'material-ui/Toggle';

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: "flex",
    flewWrap: "wrap"
  }
};

const googleAutoSuggestURL = `
  //suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;


// new system
const APIk = 'AIzaSyA8cOPpMYBZuZUStD7YVLYi_sq2kVXgMYA'
const result = 2
const realURL = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=${result}&key=${APIk}`


class Searching extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.onToggle = this.onToggle.bind(this);
    // this.onNewRequest = this.onNewRequest.bind(this);
    // this.YoutubeClient = YoutubeFinder.createClient({ key: this.props.apiKey });
    this.state = {
      dataSource: [],
      inputValue: "",
      checked: false
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

    if (this.state.inputValue !== '') {
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

  handleRequest () {
    const lastURL = `${realURL}&q=${this.state.inputValue}`;
    // console.log ('lastURL', lastURL)
    fetch (lastURL)
      .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson)
          const dataSource = responseJson.items.map(obj => obj.snippet.channelTitle);
          this.setState({dataSource})
          // console.log(this.state.dataSource)
        })
        .catch((error) => {
          console.error(error);
        })
  }

  onToggle (e) {

    this.setState({
      checked: e.target.checked
    });
      console.log('yo', !this.state.checked);

    // this.setState({
    //   [state]: event.target.value
    // });

  }

  // onNewRequest(searchTerm) {
  //   const self = this,
  //     params = {
  //       part: "id,snippet",
  //       type: "video",
  //       q: this.state.inputValue,
  //       maxResults: "4"
  //     };
  //
  //   this.YoutubeClient.search(params, function(error, results) {
  //     if (error) return console.log(error);
  //     self.props.callback(results.items, searchTerm);
  //
  //     self.setState({
  //       dataSource: [],
  //       inputValue: self.state.inputValue
  //     });
  //   });
  // }

  // render () {
  //   return (
  //     <div style={this.styles.wrapper}>
  //       {this.state.}
  //     </div>
  //   );
  // }

  render() {
    // console.log(realURL)
      //  console.log(this.state.dataSource)
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AutoComplete
            // searchText={this.state.inputValue}
            hintText="legit2"
            openOnFocus={true}
            dataSource={this.state.dataSource}
            onUpdateInput={this.onUpdateInput}
            onNewRequest={this.onNewRequest}
            fullWidth={true}
          />
          <Chip style={styles.chip}>
            {" "}{this.state.inputValue}{" "}
          </Chip>
          <br />
          <br />
          <ChipInput
            searchText={this.state.inputValue}
            fullWidth={true}
            dataSource={this.state.dataSource}
            onUpdateInput={this.onUpdateInput}
            onChange={this.handleRequest}
          />
          <br/>
          <br/>
          <Toggle onToggle={(e) => this.onToggle(e)} />

          <br/>
          <br/>
          {
            this.state.dataSource.map((link, i) => {
              // console.log('mylink', link);
              let application = <div key={i}>Title: <b>{link}</b></div>
              return application
            })
          }
          {this.application}

        </div>
      </MuiThemeProvider>
    );
  }
}
export default Searching;

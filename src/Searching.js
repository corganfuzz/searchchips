import React, {Component} from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import JSONP from 'jsonp';
import YoutubeFinder from 'youtube-finder';

const googleAutoSuggestURL = `
  //suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;

class Searching extends Component {
  constructor(props){
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.YoutubeClient = YoutubeFinder.createClient ({key: this.props.apiKey});
    this.state = {
      dataSource: [],
      inputValue: ''
    }
  }

  onUpdateInput (inputValue) {
    const self = this;

    this.setState({
      inputValue: inputValue
    }, function() {
      self.performSearch();
    });
  }

  performSearch () {
    const self = this,

    url = googleAutoSuggestURL + this.state.inputValue;

    if (this.state.inputValue !== '') {
      JSONP (url, function(error, data) {
        let searchResults, retrievedSearchTerms;
        if (error) return error;

        searchResults = data[1];

        retrievedSearchTerms = searchResults.map(function(result) {
          return result[0];
        });

        self.setState({
          dataSource: retrievedSearchTerms
        })
      })
    }
  }

  onNewRequest (searchTerm) {
    const self = this,
    params = {
      part :'id,snippet',
      type: 'video',
      q: this.state.inputValue,
      maxResults: '50'
    }

    this.YoutubeClient.search(params, function(error, results) {
      if (error) return console.log(error);
      self.props.callback(results.items, searchTerm);

      self.setState({
        dataSource: [],
        inputValue: ''
      });
    });
  }

render () {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <AutoComplete
      searchText={this.state.inputValue}
      hintText="legit2"
      openOnFocus={true}
      dataSource = {this.state.dataSource}
      onUpdateInput ={this.onUpdateInput}
      onNewRequest = {this.onNewRequest}
      fullWidth={true}
    />
    </MuiThemeProvider>
);
  }
}
export default Searching;
import React from 'react';
import axios from 'axios';

import SearchBar from './SearchBar.jsx';
import DisplayResult from './DisplayResult.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      searchResults: [],
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.searchResultsRender = this.searchResultsRender.bind(this);
  }
  updateSearch(e) {
    this.setState({
      searchString: e.target.value,
    });
  }

  submitSearch(e) {
    e.preventDefault();
    axios
      .get(`/events?q=${this.state.searchString}&_page&_limit=10`)
      .then((response) => {
        this.setState({
          searchResults: response.data,
          searchString: "",
        });
      })
      .catch((err) => console.log("ERROR!  ", err));
  }
  searchResultsRender() {
    if (this.state.searchResults.length === 0) {
      return <p> Nothing found...</p>;
    } else {
      return (
        <div>
          {this.state.searchResults.map((record, idx) => (
            <DisplayResult record={record} key={idx} />
          ))}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          <SearchBar
            updateSearch={this.updateSearch}
            submitSearch={this.submitSearch}
          />
        </div>
        <div>{this.searchResultsRender()}</div>
      </div>
    );
  }
}

export default App;

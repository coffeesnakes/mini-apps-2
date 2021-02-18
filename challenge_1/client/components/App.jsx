import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar.jsx";
import DisplayResult from "./DisplayResult.jsx";

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

  updateSearch(event) {
    this.setState({
      searchString: event.target.value,
    });
  }

  submitSearch(event) {
    event.preventDefault();
    axios
      .get(`/events?q=${this.state.searchString}&_page=1&_limit=10`)
      .then((response) => {
        this.setState({
          searchResults: response.data,
          searchString: "",
        });
      })
      .catch((error) => console.log("ERROR - ", error));
  }

  searchResultsRender() {
    if (this.state.searchResults.length === 0) {
      return <p>Time for a new search!</p>;
    } else {
      return (
        <div>
          {this.state.searchResults.map((record, index) => (
            <DisplayResult record={record} key={index} />
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
        {this.searchResultsRender()}
      </div>
    );
  }
}

export default App;

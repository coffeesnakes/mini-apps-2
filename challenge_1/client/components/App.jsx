import axios from 'axios';
import React from 'react';
import ReactPaginate from 'react-paginate';
import DisplayResult from './DisplayResult.jsx';
import SearchBar from './SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      currentPage: 1
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.fetchHistory = this.fetchHistory.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchResultsRender = this.searchResultsRender.bind(this);
  }

  updateSearch (event) {
    this.setState({
      searchString: event.target.value
    });
  }

  fetchHistory (currentPage) {
    axios.get(`/events?q=${this.state.searchString}&_page=${currentPage}&_limit=10`)
      .then(response => {
        this.setState({
          searchResults: response.data,
          pageCount: Math.ceil(response.headers['x-total-count'] / 10)
        });
      })
      .catch(error => console.log('ERROR - ', error));
  }

  handlePageClick (event) {
    this.setState({
      currentPage: event.selected + 1
    }, () => this.fetchHistory(this.state.currentPage));
  }

  searchResultsRender () {
    if (this.state.searchResults.length === 0) {
      return (<p>Time for a new search!</p>);
    } else {
      return (
        <div>
          {this.state.searchResults.map((record, index) => <DisplayResult record={record} key={index} />)}
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
          />
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <div>
          <SearchBar updateSearch={this.updateSearch} fetchHistory={this.fetchHistory} />
        </div>
        <div>
          {this.searchResultsRender()}
        </div>
      </div>
    );
  };
}

export default App;

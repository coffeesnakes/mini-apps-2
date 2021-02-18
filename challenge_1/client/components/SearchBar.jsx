import React from 'react';

const SearchBar = ({updateSearch, submitSearch}) => {
  return (
    <form onSubmit={submitSearch}>
      <label>
        Search Historical Events:
        <input type="text" onChange={updateSearch} />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}

export default SearchBar;

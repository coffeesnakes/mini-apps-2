import React from "react";

const SearchBar = ({ updateSearch, fetchHistory }) => {
  return (
    <div>
      <label>
        Search Historical Events:
        <br />
        <input type="text" onChange={updateSearch} />
      </label>
      <input type="button" value="Search!" onClick={() => fetchHistory(1)} />
    </div>
  );
};

export default SearchBar;

import React from "react";

function Search(props) {
  return (
    <div>
      <div className="form">
        <input className="searchInput" type="text"></input>
        <button className="searchBtn" onClick={() => props.searchBooks()}>
          Search
        </button>
      </div>
      <div className="bookList">{books.map({ title })}</div>
    </div>
  );
}

export default Search;

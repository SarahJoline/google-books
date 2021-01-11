import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import "./index.css";

import BookCard from "./BookCard";

function BorrowPage(props) {
  const userBooks = props.userBooks;
  const joinedBooks = props.joinedBooks;
  let [searchTerm, setSearchTerm] = useState();

  if (!joinedBooks) {
    return <div>Loading!</div>;
  }

  let matches;

  if (searchTerm && joinedBooks) {
    matches = _.filter(joinedBooks, (joinedBook) => {
      return joinedBook.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div className="borrow-page">
      <input
        className="searchTerm"
        type="text"
        placeholder="Search for books to borrow"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="available-books">
        {matches ? matches.length : userBooks.length} books available
      </div>
      {/* <div className="location">within 10 miles of 2330 Larkin</div> */}
      <div className="borrow-books">
        {!searchTerm &&
          joinedBooks.map((joinedBook) => (
            <BookCard joinedBookID={joinedBook._id} key={joinedBook._id} />
          ))}
        {searchTerm &&
          matches.map((joinedBook) => (
            <BookCard joinedBookID={joinedBook._id} />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

export default connect(mapStateToProps, null)(BorrowPage);

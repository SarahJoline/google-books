import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import "./index.css";

import BookCard from "./BookCard";

function BorrowPage(props) {
  const userBooks = props.userBooks;
  const joinedBooks = props.joinedBooks;
  let [searchTerm, setSearchTerm] = useState();

  console.log("BorrowPAge - joinedBooks", joinedBooks);

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
      <div className="available-books">{userBooks.length} books available</div>
      {/* <div className="location">within 10 miles of 2330 Larkin</div> */}
      <div className="borrow-books">
        {!searchTerm &&
          joinedBooks.map((joinedBook) => (
            <BookCard
              joinedBook={joinedBook}
              borrowerID={joinedBook.borrowerID}
              key={joinedBook._id}
            />
          ))}
        {searchTerm &&
          matches.map((joinedBook) => (
            <BookCard
              joinedBook={joinedBook}
              borrowerID={joinedBook.borrowerID}
            />
          ))}
      </div>
    </div>
  );
}

// //reading out of the redux state into the component's props
const mapStateToProps = (state) => {
  return {
    books: state.books.data,
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

//writing
const mapDispatchToProps = (dispatch) => {
  return {
    loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
    loadedUserBooks: (data) =>
      dispatch({ type: "USERBOOKS_LOADED", data: data }),
    loadedJoinedBooks: (data) =>
      dispatch({ type: "JOINED_LOADED", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BorrowPage);

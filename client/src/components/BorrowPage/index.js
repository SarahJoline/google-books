import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import "./index.css";
import BookCard from "./BookCard";

function BorrowPage(props) {
  const { userBooks, joinedBooks } = props;
  let [searchTerm, setSearchTerm] = useState();

  let orderedBooks = _.orderBy(joinedBooks, ["borrowerID"], ["desc"]);

  if (!joinedBooks) {
    return <div>Loading!</div>;
  }

  let matches;

  if (searchTerm && joinedBooks) {
    matches = _.filter(orderedBooks, (joinedBook) => {
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
          orderedBooks.map((joinedBook) => (
            <BookCard joinedBookID={joinedBook._id} image={joinedBook.image} title={joinedBook.title} joinedBook={joinedBook} borrowerId={joinedBook.borrowerID} key={joinedBook._id} />
          ))}
        {searchTerm &&
          matches.map((joinedBook) => (
            <BookCard joinedBookID={joinedBook._id} image={joinedBook.image} title={joinedBook.title} joinedBook={joinedBook} borrowerId={joinedBook.borrowerID} key={joinedBook._id} />
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

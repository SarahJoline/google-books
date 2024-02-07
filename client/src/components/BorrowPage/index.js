import _ from "lodash";
import React, { useState } from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import BookCard from "../BookCard";
import "./index.css";

function BorrowPage(props) {
  const { userBooks, joinedBooks, borrowBook } = props;
  let loggedInStatus = AuthHelperMethods.loggedIn();
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

  function handleBorrowClick(book) {
    const joinedBookID = book._id;
    const userInfo = AuthHelperMethods.decodeToken();
    const { userID } = userInfo;

    AuthHelperMethods.fetch(`/api/userbooks/borrow/${book.id}`, {
      method: "PATCH",
      borrowerID: userID,
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });

    borrowBook(userID, joinedBookID);
  }

  let booksToDisplay = !searchTerm ? orderedBooks : matches;

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
        {booksToDisplay.map((book) => (
          <BookCard
            handleClick={handleBorrowClick}
            bookID={book._id}
            image={book.image}
            title={book.title}
            book={book}
            borrowerId={book.borrowerID}
            key={book._id}
            text={"BORROW"}
            loggedInStatus={loggedInStatus}
          />
        ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    borrowBook: (userID, joinedBookID) =>
      dispatch({ type: "BORROW_BOOK", userID, joinedBookID }),
  };
};

const mapStateToProps = (state) => {
  return {
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BorrowPage);

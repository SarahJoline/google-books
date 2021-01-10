import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";

const BookCard = (props) => {
  const { joinedBook, borrowerID } = props;

  console.log("BookCard Render");
  // TODO: I want to rerender this when joinedBook.borrowerID changes.

  function handleBorrowClick(joinedBook) {
    AuthHelperMethods.fetch(`/api/userbooks/borrow/${joinedBook._id}`, {
      method: "PATCH",
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });

    const userInfo = AuthHelperMethods.decodeToken();
    props.borrowBook(userInfo.userID, joinedBook._id);
  }

  return (
    <div className="book-card">
      <img
        className="book-image"
        src={joinedBook.image}
        alt={joinedBook.title}
      />

      <div className="button-div">
        {borrowerID && (
          <div className="checked-out">
            <span>CHECKED OUT</span>
          </div>
        )}
        {!borrowerID && (
          <button
            className="lend-button"
            onClick={() => {
              handleBorrowClick(joinedBook);
            }}
            id={joinedBook.id}
            data={joinedBook}
          >
            BORROW
          </button>
        )}
      </div>
    </div>
  );
};

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
    borrowBook: (userID, joinedBookID) =>
      dispatch({ type: "BORROW_BOOK", userID, joinedBookID }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";

const BookCard = (props) => {
  const { joinedBook } = props;

  console.log("joinedbook", joinedBook);

  const [isClicked, setIsClicked] = useState(false);

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

    setIsClicked(true);
  }

  return (
    <div className="book-card">
      <img
        className="book-image"
        src={joinedBook.image}
        alt={joinedBook.title}
      />

      <div className="button-div">
        {joinedBook.borrowerID && (
          <div className="checked-out">
            <span>CHECKED OUT</span>
          </div>
        )}
        {!joinedBook.borrowerID && (
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

const mapStateToProps = (state, ownProps) => {
  return {
    joinedBook: _.find(state.joinedBooks.data, { _id: ownProps.joinedBookID }),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    borrowBook: (userID, joinedBookID) =>
      dispatch({ type: "BORROW_BOOK", userID, joinedBookID }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);

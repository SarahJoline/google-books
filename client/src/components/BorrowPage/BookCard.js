import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";

const BookCard = ({ joinedBook, borrowBook, joinedBookID, image, title, borrowerId}) => {
  console.log(joinedBook)

  const [isClicked, setIsClicked] = useState(false);

  let loggedInStatus = AuthHelperMethods.loggedIn();

  function handleBorrowClick(joinedBook) {
    AuthHelperMethods.fetch(`/api/userbooks/borrow/${joinedBookID}`, {
      method: "PATCH",
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });

    const userInfo = AuthHelperMethods.decodeToken();
    borrowBook(userInfo.userID, joinedBook._id);

    setIsClicked(true);
  }

  return (
    <div className="book-card" key={joinedBookID}>
      <img
        className="book-image"
        src={image}
        alt={title}
      />

      <div className="button-div">
        {borrowerId && (
          <div className="checked-out">
            <span>CHECKED OUT</span>
          </div>
        )}
        {!borrowerId && (
          <button
            className="lend-button"
            onClick={() => {
              loggedInStatus
                ? handleBorrowClick(joinedBook)
                : console.log("Not logged in");
            }}
            id={joinedBookID}
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

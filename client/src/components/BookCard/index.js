import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import "../BorrowPage/index.css";

function BookCard({ book, bookID, image, title, borrowerId, handleClick }) {
  let loggedInStatus = AuthHelperMethods.loggedIn();
  return (
    <div className="book-card" key={bookID}>
      <img className="book-image" src={image} alt={title} />

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
              loggedInStatus ? handleClick(book) : console.log("Not logged in");
            }}
            id={bookID}
            data={book}
          >
            BORROW
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    joinedBook: _.find(state.joinedBooks.data, { _id: ownProps.bookID }),
  };
};

export default connect(mapStateToProps, null)(BookCard);

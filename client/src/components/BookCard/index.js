import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import "../BorrowPage/index.css";

function BookCard({
  book,
  bookID,
  image,
  title,
  handleClick,
  text,
  loggedInStatus,
  buttonClass,
}) {
  return (
    <div className="book-card" key={bookID}>
      <img className="book-image" src={image} alt={title} />

      <div className="button-div">
        <button
          className={buttonClass}
          onClick={() => {
            loggedInStatus ? handleClick(book) : console.log("Not logged in");
          }}
          id={bookID}
          data={book}
        >
          {text}
        </button>
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

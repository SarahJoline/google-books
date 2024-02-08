import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import "../BorrowPage/index.css";

function BookCard({
  book,
  bookID,
  _id,
  image,
  title,
  handleClick,
  text,
  open,
  openModal,
  loggedInStatus,
  buttonClass,
}) {
  return (
    <div className="book-card" key={_id}>
      <img className="book-image" src={image} alt={title} />

      <div className="button-div">
        <button
          className={buttonClass}
          onClick={() => {
            loggedInStatus && openModal
              ? handleClick(book, open)
              : loggedInStatus && !openModal
              ? handleClick(book)
              : console.log("Not logged in");
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

import React from "react";
import "./index.css";

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

export default BookCard;

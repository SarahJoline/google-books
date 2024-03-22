import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { BorrowButton } from "../Buttons";
import "./index.css";

function MyBook(props) {
  const { book } = props;

  function deleteBook(book) {
    axios
      .request({
        method: "DELETE",
        url: `/api/userbooks/delete/${book._id}`,
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });

    props.deleteFromJoinedBooks(book._id);
  }

  function returnBook(book) {
    axios
      .request({
        method: "PATCH",
        url: `/api/userbooks/return/${book._id}`,
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });

    props.returnBook(book);
  }

  return (
    <div className="lend-book-card" key={book._id}>
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.authors}</div>
      </div>
      {book.borrowerID ? (
        <BorrowButton
          handleClick={() => {
            returnBook(book);
          }}
          text={"Returned"}
        />
      ) : (
        <button className="trash-button">
          <img
            className="trash-btn"
            src="./Group.png"
            alt="X"
            onClick={() => {
              deleteBook(book);
            }}
            book={book._id}
            data={book}
          />
        </button>
      )}
    </div>
  );
}

//writing
const mapDispatchToProps = (dispatch) => {
  return {
    returnBook: (data) => dispatch({ type: "RETURN_BOOK", data: data }),
    deleteFromJoinedBooks: (_id) =>
      dispatch({ type: "DELETE_FROM_JOINED", _id: _id }),
  };
};

export default connect(null, mapDispatchToProps)(MyBook);

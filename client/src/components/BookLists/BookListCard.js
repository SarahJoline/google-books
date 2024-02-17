import axios from "axios";
import React from "react";
import { connect } from "react-redux";
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
  }

  return (
    <div className="lend-book-card" key={book._id}>
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.authors}</div>
      </div>
      {book.borrowerID ? (
        <button
          onClick={() => {
            returnBook(book);
          }}
        >
          {" "}
          Mark as returned
        </button>
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
    deleteFromJoinedBooks: (_id) =>
      dispatch({ type: "DELETE_FROM_JOINED", _id: _id }),
  };
};

export default connect(null, mapDispatchToProps)(MyBook);

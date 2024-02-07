import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import "./index.css";

function MyBook(props) {
  let myBooks = props.myBooks;

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

  return myBooks !== undefined ? (
    <div>
      {myBooks.map((book) => (
        <div className="lend-book-card" key={book._id}>
          <div className="book-info">
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.authors}</div>
          </div>
          <button className="trash-button">
            <img
              className="trash-btn"
              src="./Group.png"
              alt="X"
              onClick={(event) => {
                deleteBook(book);
              }}
              book={book._id}
              data={book}
            />
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
}

// //reading out of the redux state into the component's props
const mapStateToProps = (state) => {
  return {
    joinedBooks: state.joinedBooks.data,
  };
};

//writing
const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromJoinedBooks: (_id) =>
      dispatch({ type: "DELETE_FROM_JOINED", _id: _id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBook);

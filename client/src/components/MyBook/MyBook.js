import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import "./myBooks.css";
import axios from "axios";

function MyBook(props) {
  const loadedJoinedBooks = props.joinedBooks;
  let myBooks = props.myBooks;

  function deleteBook(book) {
    console.log(book);

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
          <div className="button-div">
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
          </div>
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
    books: state.books.data,
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

//writing
const mapDispatchToProps = (dispatch) => {
  return {
    loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
    loadedUserBooks: (data) =>
      dispatch({ type: "USERBOOKS_LOADED", data: data }),
    loadedJoinedBooks: (data) =>
      dispatch({ type: "JOINED_LOADED", data: data }),
    deleteFromJoinedBooks: (_id) =>
      dispatch({ type: "DELETE_FROM_STORE", _id: _id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBook);

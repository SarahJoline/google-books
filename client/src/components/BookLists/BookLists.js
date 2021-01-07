import React, { useEffect, useState } from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import { connect } from "react-redux";
import _ from "lodash";

import "./bookLists.css";
import axios from "axios";

function MyBook(props) {
  const loadedJoinedBooks = props.loadedJoinedBooks;
  let myBooks = props.myBooks;

  function deleteBook(book) {
    console.log(book);

    axios.request({
      method: "DELETE",
      url: `/api/userbooks/delete/${book._id}`,
    });
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

function BookList(props) {
  let [myBooks, setMyBooks] = useState();
  console.log(props.joinedBooks);
  let joinedBooks = props.joinedBooks;

  useEffect(() => {
    getMyBooks();
  }, []);

  function getMyBooks() {
    const userInfo = AuthHelperMethods.decodeToken();
    console.log(userInfo.userID);
    console.log(joinedBooks);
    setMyBooks(_.filter(joinedBooks, { lenderID: userInfo.userID }));
  }

  return (
    <div className="booklist">
      <div className="booklist-content">
        <div className="lending">Books you're lending</div>
        <div className="lending-number">3 books</div>
        <div className="booklist-div">
          <MyBook myBooks={myBooks} />
        </div>
      </div>
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

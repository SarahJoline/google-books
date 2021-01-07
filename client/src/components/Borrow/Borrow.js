import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import "./borrow.css";

function CheckedOut() {
  return (
    <div className="checked-out">
      <span>CHECKED OUT</span>
    </div>
  );
}

function BorrowButton(props) {
  const book = props.book;
  console.log(props);

  function borrow(event, book) {
    console.log(event, book);
    AuthHelperMethods.fetch(`/api/userbooks/borrow/${book._id}`, {
      method: "PATCH",
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  return (
    <button
      className="lend-button"
      onClick={(event) => {
        console.log(book._id);
        borrow(event, book);
      }}
      id={book.id}
      data={book}
    >
      BORROW
    </button>
  );
}

const BookCard = (props) => {
  const book = props.book;
  let bookStatus = book.borrowerID;

  return book !== null ? (
    <div className="book-card">
      <img className="book-image" src={book.image} alt={book.title} />

      <div className="button-div">
        {bookStatus !== null ? <CheckedOut /> : <BorrowButton book={book} />}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

function Borrow(props) {
  const books = props.books;
  const userBooks = props.userBooks;
  const joinedBooks = props.joinedBooks;

  let [searchTerm, setSearchTerm] = useState();

  let orderedBooks = _.orderBy(userBooks, ["borrowerID"], ["desc"]);
  console.log(orderedBooks);

  useEffect(() => {
    joinBooks();
  }, [books, userBooks]);

  let displayBooks = [];

  function joinBooks() {
    let orderedBooks = _.orderBy(userBooks, ["borrowerID"], ["desc"]);
    if (books !== undefined && userBooks !== undefined) {
      for (var i = 0; i < orderedBooks.length; i++) {
        let foundBook = _.find(books, { _id: orderedBooks[i].bookID });
        let joinedBook = { ...foundBook, ...orderedBooks[i] };
        displayBooks.push(joinedBook);
      }

      props.loadedJoinedBooks(displayBooks);
    }
  }

  if (!joinedBooks) {
    return <div>Loading!</div>;
  }

  let matches;

  if (searchTerm && joinedBooks) {
    matches = _.filter(joinedBooks, (book) => {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div className="borrow-page">
      <input
        className="searchTerm"
        type="text"
        placeholder="Search for books to borrow"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="available-books">{userBooks.length} books available</div>
      {/* <div className="location">within 10 miles of 2330 Larkin</div> */}
      <div className="borrow-books">
        {!searchTerm &&
          joinedBooks.map((book) => <BookCard book={book} key={book._id} />)}
        {searchTerm && matches.map((book) => <BookCard book={book} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Borrow);

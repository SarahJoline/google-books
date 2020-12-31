import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import axios from "axios";
import "./borrow.css";

const BookCard = (props) => {
  console.log(props);
  const book = props.book;

  return (
    <div className="book-card" key={book._id}>
      <img className="book-image" src={book.image} alt={book.title} />

      <div className="button-div">
        <button
          className="lend-button"
          onClick={(event) => {
            console.log("send help");
          }}
          id={book.id}
          data={book}
        >
          BORROW
        </button>
      </div>
    </div>
  );
};

function Borrow(props) {
  const books = props.books;
  const userBooks = props.userBooks;

  let [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    getAllBooks();
  }, []);

  // useEffect(() => {
  //   joinBooks();
  // }, [userBooks]);

  function getAllBooks() {
    axios
      .request({
        method: "GET",
        url: "/api/borrow-books",
      })
      .then((res) => {
        props.loadedBooks(res.data);
      });

    axios
      .request({
        method: "GET",
        url: "/api/getuserbooks",
      })
      .then((res) => {
        props.loadedUserBooks(res.data);
      });
  }

  //it needs to match the userBooks to the Books and then display those
  //With the userBook _id as a key
  //then the search will go through that set of Data, instead of Books.

  let displayBooks = [];

  if (userBooks && books) {
    for (var i = 0; i < userBooks.length; i++) {
      let foundBook = _.find(books, { _id: userBooks[i].bookID });
      let joinedBook = { ...foundBook, ...userBooks[i] };
      displayBooks.push(joinedBook);
    }
  }

  if (!props.books) {
    return <div>Loading!</div>;
  }

  let matches;

  if (searchTerm && displayBooks) {
    matches = _.filter(displayBooks, (book) => {
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
      <div className="available-books">58 books available</div>
      <div className="location">within 10 miles of 2330 Larkin</div>
      <div className="borrow-books">
        {!searchTerm && displayBooks.map((book) => <BookCard book={book} />)}
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
  };
};

//writing
const mapDispatchToProps = (dispatch) => {
  return {
    loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
    loadedUserBooks: (data) =>
      dispatch({ type: "USERBOOKS_LOADED", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Borrow);

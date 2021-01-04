import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import axios from "axios";
import "./borrow.css";

const BookCard = (props) => {
  const book = props.book;
  console.log(props);

  function borrow(event, book) {
    console.log(event, book);
    AuthHelperMethods.fetch(`/api/postborrow/${book._id}`, {
      method: "PATCH",
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="book-card">
      <img className="book-image" src={book.image} alt={book.title} />

      <div className="button-div">
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
      </div>
    </div>
  );
};

function Borrow(props) {
  const books = props.books;
  const userBooks = props.userBooks;
  const joinedBooks = props.joinedBooks;
  console.log(joinedBooks);

  let [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    joinBooks();
  }, [books, userBooks]);

  async function getAllBooks() {
    try {
      await axios
        .request({
          method: "GET",
          url: "/api/borrow-books",
        })
        .then((res) => {
          props.loadedBooks(res.data);
        });

      await axios
        .request({
          method: "GET",
          url: "/api/getuserbooks",
        })
        .then((res) => {
          props.loadedUserBooks(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }

  //it needs to match the userBooks to the Books and then display those
  //With the userBook _id as a key
  //then the search will go through that set of Data, instead of Books.
  let displayBooks = [];

  function joinBooks() {
    if (books !== undefined && userBooks !== undefined) {
      for (var i = 0; i < userBooks.length; i++) {
        let foundBook = _.find(books, { _id: userBooks[i].bookID });
        let joinedBook = { ...foundBook, ...userBooks[i] };
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
      <div className="available-books">58 books available</div>
      <div className="location">within 10 miles of 2330 Larkin</div>
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

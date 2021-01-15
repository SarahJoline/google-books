import React, { useEffect } from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import _ from "lodash";
import axios from "axios";
import "./index.css";
import LoggedInContent from "./LoggedInContent";
import LoggedOutContent from "./LoggedOutContent";

function Navbar(props) {
  const loggedIn = AuthHelperMethods.loggedIn();
  const books = props.books;
  const userBooks = props.userBooks;

  useEffect(() => {
    getAllBooks();
  }, []);

  async function getAllBooks() {
    try {
      await axios
        .request({
          method: "GET",
          url: "/api/books",
        })
        .then((res) => {
          props.loadedBooks(res.data);
        });

      await axios
        .request({
          method: "GET",
          url: "/api/userbooks",
        })
        .then((res) => {
          props.loadedUserBooks(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }

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

  return (
    <div className="container">
      <div className="app-name">Book Swap</div>

      {loggedIn ? <LoggedInContent /> : <LoggedOutContent />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    books: state.books.data,
    userBooks: state.userBooks.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
    loadedUserBooks: (data) =>
      dispatch({ type: "USERBOOKS_LOADED", data: data }),
    loadedJoinedBooks: (data) =>
      dispatch({ type: "JOINED_LOADED", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

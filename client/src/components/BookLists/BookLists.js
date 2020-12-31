import React, { useEffect, useState } from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import { connect } from "react-redux";

import "./bookLists.css";

function BookList(props) {
  let [myBooks, setMyBooks] = useState();
  console.log(props);

  return (
    <div className="booklist">
      <div className="booklist-content">
        <div className="lending">Books you're lending</div>
        <div className="lending-number">3 books</div>
        <div className="booklist-div">
          <div className="lend-book-card">
            <div className="book-info">
              <div className="book-title">Burial Rites</div>
              <div className="book-author">Hannah Kent</div>
            </div>
            <div className="button-div">
              <img
                className="trash-btn"
                src="./Group.png"
                alt="X"
                onClick={(event) => {
                  console.log("yo bitch");
                }}
              />
            </div>
          </div>
          <div className="lend-book-card">
            <div className="book-info">
              <div className="book-title">Burial Rites</div>
              <div className="book-author">Hannah Kent</div>
            </div>
            <div className="button-div">
              <img className="trash-btn" src="./Group.png" alt="X" />
            </div>
          </div>
          <div className="lend-book-card">
            <div className="book-info">
              <div className="book-title">Burial Rites</div>
              <div className="book-author">Hannah Kent</div>
            </div>
            <div className="button-div">
              <img className="trash-btn" src="./Group.png" alt="X" />
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

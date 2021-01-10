import React, { useState } from "react";
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

  function borrow(event, book) {
    console.log(event, book);
    AuthHelperMethods.fetch(`/api/userbooks/borrow/${book._id}`, {
      method: "PATCH",
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });

    const userInfo = AuthHelperMethods.decodeToken();
    props.updateJoinedBooks(userInfo.userID, book._id);
  }

  return (
    <button
      className="lend-button"
      onClick={(event) => {
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
  const joinedBook = props.joinedBook;

  console.log("joinedBook", joinedBook);

  return joinedBook !== null ? (
    <div className="book-card">
      <img
        className="book-image"
        src={joinedBook.image}
        alt={joinedBook.title}
      />

      <div className="button-div">
        {joinedBook.borrowerID === null ? (
          <CheckedOut />
        ) : (
          <ConnectedBorrowButton book={joinedBook} />
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

function Borrow(props) {
  const userBooks = props.userBooks;
  const joinedBooks = props.joinedBooks;
  let [searchTerm, setSearchTerm] = useState();

  if (!joinedBooks) {
    return <div>Loading!</div>;
  }

  let matches;

  if (searchTerm && joinedBooks) {
    matches = _.filter(joinedBooks, (joinedBook) => {
      return joinedBook.title.toLowerCase().includes(searchTerm.toLowerCase());
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
          joinedBooks.map((joinedBook) => (
            <ConnectedBookCard joinedBook={joinedBook} key={joinedBook._id} />
          ))}
        {searchTerm &&
          matches.map((joinedBook) => (
            <ConnectedBookCard joinedBook={joinedBook} />
          ))}
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
    updateJoinedBooks: (userID, _id) =>
      dispatch({ type: "UPDATE_STORE", data: { userID, _id } }),
  };
};

const ConnectedBorrowButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(BorrowButton);
const ConnectedBookCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCard);

export default connect(mapStateToProps, mapDispatchToProps)(Borrow);

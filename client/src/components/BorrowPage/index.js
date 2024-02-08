import Dialog from "@mui/material/Dialog";
import _ from "lodash";
import React, { useState } from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import BookCard from "../BookCard";
import GreenButton from "../Buttons/GreenButton";
import "./index.css";

function BorrowPage(props) {
  const [open, setOpen] = useState(false);

  const { userBooks, joinedBooks, borrowBook } = props;
  let loggedInStatus = AuthHelperMethods.loggedIn();
  let [searchTerm, setSearchTerm] = useState();

  let orderedBooks = _.orderBy(joinedBooks, ["borrowerID"], ["desc"]);

  if (!joinedBooks) {
    return <div>Loading!</div>;
  }

  let matches;

  if (searchTerm && joinedBooks) {
    matches = _.filter(orderedBooks, (joinedBook) => {
      return joinedBook.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  function handleBorrowClick(book) {
    const joinedBookID = book._id;
    const userInfo = AuthHelperMethods.decodeToken();
    const { userID } = userInfo;

    AuthHelperMethods.fetch(`/api/userbooks/borrow/${book.id}`, {
      method: "PATCH",
      borrowerID: userID,
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });

    borrowBook(userID, joinedBookID);
  }

  let booksToDisplay = !searchTerm ? orderedBooks : matches;

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
      <div className="available-books">
        {matches ? matches.length : userBooks.length} books available
      </div>
      {/* <div className="location">within 10 miles of 2330 Larkin</div> */}
      <div className="borrow-books">
        {booksToDisplay.map((book) => (
          <BookCard
            bookID={book._id}
            image={book.image}
            title={book.title}
            book={book}
            key={book._id}
            handleClick={setOpen}
            open={open}
            openModal={true}
            text={"BORROW"}
            buttonClass={!!book.borrowerID ? "checked-out" : "lend-button"}
            loggedInStatus={loggedInStatus}
          />
        ))}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="request-message-container">
          <div className="request-message-form">
            <header className="request-message-header">
              Send the lender a message with a meetup spot and wait for
              approval!
            </header>
            <textarea
              className="request-message-box"
              placeholder="Hey there! I would love to meet at the local cafe to borrow the book!"
            />
            <GreenButton text={"Send request"} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    borrowBook: (userID, joinedBookID) =>
      dispatch({ type: "BORROW_BOOK", userID, joinedBookID }),
  };
};

const mapStateToProps = (state) => {
  return {
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BorrowPage);

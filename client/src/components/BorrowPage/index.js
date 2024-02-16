import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import _ from "lodash";
import React, { useState } from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import GreenButton from "../Buttons/GreenButton";
import BookCard from "../Cards/BookCard";
import "./index.css";

function BorrowPage(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [messageStatus, setMessageStatus] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");

  const userInfo = AuthHelperMethods.decodeToken();
  const { userID } = userInfo;

  const { userBooks, joinedBooks, borrowBook, addConversations } = props;
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

  function handleOpenModal(book, open) {
    setOpen(!open);
    setSelectedBook(book);
  }

  async function handleStartConversation(book) {
    axios
      .post(`/api/conversations/send`, {
        participants: [userID, book?.lenderID],
        lenderID: book?.lenderID,
        book: book,
        message: message,
        userID: userID,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessageStatus(true);
        }
        addConversations(res);
        navigate(`/messages?id=${res.data._id}`);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
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
        {booksToDisplay
          .filter((book) => book.lenderID !== userID)
          .map((book) => (
            <BookCard
              bookID={book._id}
              image={book.image}
              title={book.title}
              book={book}
              _id={book._id}
              handleClick={handleOpenModal}
              open={open}
              openModal={true}
              text={!!book.borrowerID ? "CHECKED OUT" : "BORROW"}
              buttonClass={!!book.borrowerID ? "checked-out" : "lend-button"}
              loggedInStatus={loggedInStatus}
            />
          ))}
      </div>
      <Dialog
        open={open}
        onClose={() => {
          setMessageStatus(false);
          setOpen(false);
        }}
      >
        <div className="request-message-container">
          <div className="request-message-form">
            {messageStatus ? (
              <>
                <header className="request-message-header">
                  Message sent! The lender will see this message as soon a I
                  finish building out the components for it!
                </header>
              </>
            ) : (
              <>
                <header className="request-message-header">
                  Send the lender a message with a meetup spot and wait for
                  approval!
                </header>
                <textarea
                  className="request-message-box"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey there! I would love to meet at the local cafe to borrow the book!"
                />
                <GreenButton
                  text={"Send request"}
                  handleClick={() => handleStartConversation(selectedBook)}
                />
              </>
            )}
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
    addConversations: (data) =>
      dispatch({ type: "ADD_TO_CONVERSATIONS", data: data }),
  };
};

const mapStateToProps = (state) => {
  return {
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BorrowPage);

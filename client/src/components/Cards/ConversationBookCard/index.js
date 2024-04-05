import React from "react";
import { BorrowButton } from "../../Buttons";
import "./index.css";

function ConversationBookCard({ message, userID, handleBorrowClick }) {
  return (
    <div className="book-to-borrow-card">
      <img className="image" src={message.userBookId.bookID.image} />
      <h1 className="book-title">{message.userBookId.bookID.title}</h1>
      {userID === message.userBookId.lenderID &&
      !message.userBookId.borrowerID ? (
        <BorrowButton
          text="Mark as lent"
          handleClick={() => handleBorrowClick(message)}
        />
      ) : userID === message.userBookId.lenderID &&
        message.userBookId.borrowerID ? (
        <BorrowButton text="Lent!" disabled />
      ) : null}
    </div>
  );
}

export default ConversationBookCard;

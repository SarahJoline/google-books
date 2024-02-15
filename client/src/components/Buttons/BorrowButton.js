import React from "react";
import "./index.css";

function BorrowButton({ text, handleClick = () => null }) {
  return (
    <button className="borrow-button" onClick={() => handleClick()}>
      {text}
    </button>
  );
}

export default BorrowButton;

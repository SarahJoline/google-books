import React from "react";
import "./index.css";

export function BorrowButton({ text, handleClick = () => null }) {
  return (
    <button className="borrow-button" onClick={() => handleClick()}>
      {text}
    </button>
  );
}

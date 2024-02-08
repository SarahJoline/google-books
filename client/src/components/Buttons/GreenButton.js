import React from "react";
import "./index.css";

function GreenButton({ text, handleClick }) {
  return (
    <button className="green-button" onClick={() => handleClick()}>
      {text}
    </button>
  );
}

export default GreenButton;

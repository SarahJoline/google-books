import React from "react";
import "./index.css";

function GreenButton({ text, handleClick = () => null }) {
  return (
    <button className="green-button" onClick={() => handleClick()}>
      {text}
    </button>
  );
}

export default GreenButton;

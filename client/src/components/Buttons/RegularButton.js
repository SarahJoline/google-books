import React from "react";
import "./index.css";

function RegularButton({ text, handleClick = () => null }) {
  return (
    <button className="regular-button" onClick={() => handleClick()}>
      {text}
    </button>
  );
}

export default RegularButton;

import React from "react";
import "./index.css";

export function RegularButton({ text, handleClick = () => null }) {
  return (
    <button className="regular-button" onClick={() => handleClick()}>
      {text}
    </button>
  );
}

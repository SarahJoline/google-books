import React from "react";
import "./index.css";

export function GreenButton({ text, handleClick = () => null }) {
  return (
    <button className="green-button" onClick={() => handleClick()}>
      {text}
    </button>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export function ConversationButton({ text, link, handleClick = () => null }) {
  return (
    <Link className="conversation-button-link" to={link}>
      <button className="conversation-button" onClick={() => handleClick()}>
        {text}
      </button>
    </Link>
  );
}

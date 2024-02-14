import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function ConversationButton({ text, link, handleClick = () => null }) {
  return (
    <Link to={link}>
      <button className="conversation-button" onClick={() => handleClick()}>
        {text}
      </button>
    </Link>
  );
}

export default ConversationButton;

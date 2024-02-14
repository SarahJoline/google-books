import React from "react";
import "./index.css";

function ConversationButton({ text, handleClick = () => null }) {
  return (
    <button className="conversation-button" onClick={() => handleClick()}>
      {text}
    </button>
  );
}

export default ConversationButton;

import React from "react";
import ConversationBookCard from "../Cards/ConversationBookCard/index.js";
import "./index.css";

function ChatBox({
  conversation,
  setNewMessage,
  sendMessage,
  handleBorrowClick,
  messagesEndRef,
  newMessage,
  messages,
  userID,
}) {
  return (
    <div className="chat-form">
      <div className="chat-container">
        <div className="messages-container">
          {conversation?.messages?.map((message, index) => {
            return (
              <>
                {message.userBookId && (
                  <ConversationBookCard
                    message={message}
                    userID={userID}
                    handleBorrowClick={handleBorrowClick}
                  />
                )}
                <div
                  className={`message-box ${
                    message.senderID === userID ? "me-message" : "you-message"
                  }

                  `}
                  ref={index === messages.length - 1 ? messagesEndRef : null}
                >
                  {message.message}
                </div>
              </>
            );
          })}
        </div>
      </div>
      {conversation && (
        <div className="message-input-container ">
          <textarea
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
            value={newMessage}
          />
          <button
            className="send-message-button"
            disabled={newMessage.length === 0 || newMessage === " "}
            onClick={() => sendMessage(newMessage)}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatBox;

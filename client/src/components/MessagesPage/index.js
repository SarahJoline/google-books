import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import ConversationButton from "../Buttons/ConversationButton";
import "./index.css";

function MessagesPage(props) {
  const { conversations, loadConversations } = props;
  const [messages, setMessages] = useState([]);
  const userInfo = AuthHelperMethods.decodeToken();

  function getConversations() {
    axios
      .request({
        method: "GET",
        url: `/api/conversations/${userInfo.userID}`,
      })
      .then((result) => {
        loadConversations(result.data);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getConversations();
  }, []);
  return (
    <div className="lending-page">
      <div className="lending-books-div">
        {conversations?.map((convo) => {
          const { name } = convo.participants.find((participant) => {
            return participant.id !== userInfo.userID;
          });
          return (
            <ConversationButton
              text={name}
              handleClick={() => setMessages(convo.messages)}
            />
          );
        })}
      </div>
      <div className="chat-form">
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message, index) => {
              return (
                <div
                  className={`message-box ${
                    message.senderID === userInfo.userID
                      ? "me-message"
                      : "you-message"
                  }
                    
                  `}
                  ref={index === messages.length - 1 ? messagesEndRef : null}
                >
                  {message.message}
                </div>
              );
            })}
          </div>
        </div>
        <textarea className="message-input" />
      </div>
    </div>
  );
}

// //reading out of the redux state into the component's props
const mapStateToProps = (state) => {
  return {
    conversations: state.conversations.data,
  };
};

//writing
const mapDispatchToProps = (dispatch) => {
  return {
    loadConversations: (data) =>
      dispatch({ type: "CONVERSATIONS_LOADED", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);

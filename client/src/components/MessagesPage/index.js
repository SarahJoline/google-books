import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import ConversationButton from "../Buttons/ConversationButton";
import "./index.css";

function MessagesPage(props) {
  const { conversations, loadConversations } = props;
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState("");
  const userInfo = AuthHelperMethods.decodeToken();
  const { search } = useLocation();
  const [params] = useSearchParams();

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
    messagesEndRef.current?.scrollIntoView();
  };

  function sendMessage() {
    axios.request({
      method: "POST",
      url: `/api/conversation/message/send/${conversation._id}`,
    });
  }

  useEffect(() => {
    const conversation = conversations?.find((conversation) => {
      return conversation._id === params.get("id");
    });

    setConversation(conversation);
    scrollToBottom();
  }, [search, conversations, conversation]);

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
              link={`/messages?id=${convo._id}`}
              text={name}
              handleClick={() => setMessages(convo.messages)}
            />
          );
        })}
      </div>
      <div className="chat-form">
        <div className="chat-container">
          <div className="messages-container">
            {conversation?.messages?.map((message, index) => {
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

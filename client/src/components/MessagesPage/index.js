import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import ConversationButton from "../Buttons/ConversationButton";
import "./index.css";

function MessagesPage(props) {
  const { conversations, loadConversations, addToConversations, borrowBook } =
    props;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState();
  const { userID } = AuthHelperMethods.decodeToken();
  const { search } = useLocation();
  const [params] = useSearchParams();

  function handleBorrowClick(book) {
    const joinedBookID = book._id;
    const userInfo = AuthHelperMethods.decodeToken();
    const { userID } = userInfo;

    AuthHelperMethods.fetch(`/api/userbooks/borrow/${book._id}`, {
      method: "PATCH",
      borrowerID: userID,
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });

    borrowBook(userID, joinedBookID);
  }

  function getConversations() {
    axios
      .request({
        method: "GET",
        url: `/api/conversations/${userID}`,
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

  function sendMessage(newMessage) {
    console.log("Hey");
    axios
      .post(`/api/conversation/${conversation._id}/message/send`, {
        participants: conversation.participants,
        message: newMessage,
        userID: userID,
      })
      .then((res) => {
        console.log(res);
        setNewMessage("");
        //  addToConversations(res.data);
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
            return participant._id !== userID;
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
                <>
                  {message.userBookId && (
                    <div className="book-to-borrow-card">
                      <img
                        className="image"
                        src={message.userBookId.bookID.image}
                      />
                      <h1 className="book-title">
                        {message.userBookId.bookID.title}
                      </h1>
                      <button onClick={() => console.log("borrowed")}>
                        Mark as lent
                      </button>
                    </div>
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
        <div className="message-input-container ">
          <textarea
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          <button
            className="send-message-button"
            onClick={() => sendMessage(newMessage)}
          >
            Send
          </button>
        </div>
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
    addToConversations: (data) => {
      dispatch({ type: "ADD_MESSAGE_TO_CONVERSATION", data: data });
    },
    borrowBook: (userID, joinedBookID) =>
      dispatch({ type: "BORROW_BOOK", userID, joinedBookID }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);

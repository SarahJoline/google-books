import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
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

  useEffect(() => {
    getConversations();
  }, []);
  return (
    <div className="lending-page">
      <div className="lending-books-div">
        {conversations?.map((convo) => {
          console.log(convo);
          const { name } = convo.participants.find((participant) => {
            return participant.id !== userInfo.userID;
          });
          console.log(name);
          return (
            <button onClick={() => setMessages(convo.messages)}>{name}</button>
          );
        })}
      </div>
      <div className="form">
        <div className="render-books">
          <div className="book-container">
            {messages.map((message) => {
              return <div>{message.message}</div>;
            })}
          </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);

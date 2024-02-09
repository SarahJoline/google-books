import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import "./index.css";

function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const userInfo = AuthHelperMethods.decodeToken();

  function getConversations() {
    console.log("HEY");
    axios
      .request({
        method: "GET",
        url: `/api/conversations/${userInfo.userID}`,
      })
      .then((result) => {
        setConversations(result);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
  console.log(conversations);
  useEffect(() => {
    getConversations();
  }, []);
  return <div className="messages-page">Messages will go here!</div>;
}

export default MessagesPage;

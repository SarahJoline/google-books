import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import "./index.css";

function MessagesPage() {
  const [conversations, setConversations] = useState();
  const userInfo = AuthHelperMethods.decodeToken();

  function getConversations() {
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

  useEffect(() => {
    getConversations();
  }, []);
  return (
    <div className="lending-page">
      <div className="lending-books-div"></div>
      <div className="form">
        <div className="render-books">
          <div className="book-container"></div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;

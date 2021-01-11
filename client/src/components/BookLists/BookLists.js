import React from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import { connect } from "react-redux";
import _ from "lodash";
import "./bookLists.css";
import MyBook from "../MyBook/MyBook";

function BookList(props) {
  console.log(props);
  const userInfo = AuthHelperMethods.decodeToken();

  const myBooks = _.filter(props.joinedBooks, {
    lenderID: userInfo.userID,
  });

  return (
    <div className="booklist">
      <div className="booklist-content">
        <div className="lending">Books you're lending</div>
        <div className="lending-number">{myBooks.length} books</div>
        <div className="booklist-div">
          <MyBook myBooks={myBooks} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    joinedBooks: state.joinedBooks.data,
  };
};

export default connect(mapStateToProps, null)(BookList);

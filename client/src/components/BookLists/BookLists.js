import React from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import { connect } from "react-redux";
import _ from "lodash";
import "./bookLists.css";
import MyBook from "../MyBook/MyBook";

function BookList(props) {
  const userInfo = AuthHelperMethods.decodeToken();

  const myBooks = _.filter(props.joinedBooks, {
    lenderID: userInfo.userID,
  });

  return (
    <div className="booklist">
      <div className="booklist-content">
        <div className="lending">Books you're lending</div>
        <div className="lending-number">3 books</div>
        <div className="booklist-div">
          <MyBook myBooks={myBooks} />
        </div>
      </div>
    </div>
  );
}

// //reading out of the redux state into the component's props
const mapStateToProps = (state) => {
  return {
    books: state.books.data,
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

//writing
const mapDispatchToProps = (dispatch) => {
  return {
    loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
    loadedUserBooks: (data) =>
      dispatch({ type: "USERBOOKS_LOADED", data: data }),
    loadedJoinedBooks: (data) =>
      dispatch({ type: "JOINED_LOADED", data: data }),
    deleteFromJoinedBooks: (_id) =>
      dispatch({ type: "DELETE_FROM_STORE", _id: _id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

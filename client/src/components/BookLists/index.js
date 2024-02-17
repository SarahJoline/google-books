import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import BookListCard from "./BookListCard";
import "./index.css";

function BookList(props) {
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
          {myBooks.map((book) => {
            return <BookListCard book={book} />;
          })}
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

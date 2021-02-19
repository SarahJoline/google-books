import React from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import "./index.css";

function BookCards(props) {
  const books = props.bData;

  function addBooks(event, books) {
    AuthHelperMethods.fetch(`/api/books/lend/${books.id}`, {
      method: "POST",
      body: JSON.stringify({
        id: books.id,
        title: books.title,
        authors: books.authors,
        description: books.description,
        link: books.link,
        image: books.image,
      }),
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });

    const userInfo = AuthHelperMethods.decodeToken();

    props.addToJoinedBooks({
      id: books.id,
      title: books.title,
      authors: books.authors,
      description: books.description,
      link: books.link,
      image: books.image,
      borrowerID: null,
      lenderID: userInfo.userID,
    });
  }

  let bookArray = books.map((book, index) => {
    return (
      <div className="book-card" key={book.id}>
        <img className="book-image" src={book.image} alt={book.title} />

        <div className="button-div">
          <button
            className="lend-button"
            onClick={(event) => {
              addBooks(event, book);
            }}
            id={book.id}
            data={book}
          >
            LEND
          </button>
        </div>
      </div>
    );
  });

  return <div className="book-container">{bookArray}</div>;
}

const mapStateToProps = (state) => {
  return {
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToJoinedBooks: (data) => dispatch({ type: "ADD_TO_JOINED", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCards);

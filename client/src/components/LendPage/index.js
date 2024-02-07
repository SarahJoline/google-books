import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import BookCard from "../BookCard";
import BookLists from "../BookLists";
import "./index.css";

function Lend(props) {
  const [value, modifier] = useState({ value: "" });
  let loggedInStatus = AuthHelperMethods.loggedIn();

  let [books, setBooks] = useState([]);

  function handleSearch() {
    axios
      .request({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${value.value}&startIndex=0&max-results=40`,
      })
      .then((response) => {
        let bookData = response.data.items;

        let bookResults = [];
        for (var i = 0; i < bookData.length; i++) {
          let bookInfo = bookData[i].volumeInfo;
          var imageLink = bookInfo.imageLinks
            ? bookInfo.imageLinks.thumbnail
            : console.log("no image available");

          let book = {
            id: bookData[i].id,
            title: bookInfo.title,
            authors: bookInfo.authors,
            description: bookInfo.description,
            link: bookInfo.infoLink,
            image: imageLink,
          };
          bookResults.push(book);
        }
        setBooks(bookResults);
      });
  }

  function addBooksToMyLendableBooks(book) {
    AuthHelperMethods.fetch(`/api/books/lend/${book.id}`, {
      method: "POST",
      body: JSON.stringify({
        id: book.id,
        title: book.title,
        authors: book.authors,
        description: book.description,
        link: book.link,
        image: book.image,
      }),
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });

    const userInfo = AuthHelperMethods.decodeToken();

    props.addToJoinedBooks({
      id: book.id,
      title: book.title,
      authors: book.authors,
      description: book.description,
      link: book.link,
      image: book.image,
      borrowerID: null,
      lenderID: userInfo.userID,
    });
  }

  return (
    <div className="lending-page">
      <div className="lending-books-div">
        <BookLists />
      </div>
      <div className="form">
        <h3>Have additional books to lend?</h3>
        <input
          className="searchInput"
          type="text"
          placeholder="Search for books to lend"
          onChange={(e) => {
            modifier({ value: e.target.value });
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        ></input>
        <div className="render-books">
          <div className="book-container">
            {books.map((book) => {
              return (
                <BookCard
                  book={book}
                  bookID={book.id}
                  image={book.image}
                  title={book.title}
                  handleClick={addBooksToMyLendableBooks}
                  text={"LEND"}
                  loggedInStatus={loggedInStatus}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Lend);

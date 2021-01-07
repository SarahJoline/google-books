import React, { useState } from "react";
import "./lend.css";
import { connect } from "react-redux";
import axios from "axios";
import BookCards from "../BookCards/BookCards";
import BookLists from "../BookLists/BookLists";

function Lend(props) {
  const [value, modifier] = useState({ value: " " });
  let [books, booksModifier] = useState([]);

  function handleSearch() {
    axios
      .request({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${value.value}&startIndex=0&max-results=40`,
      })
      .then((response) => {
        console.log(response);
        let bookData = response.data.items;
        console.log(bookData);
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
        booksModifier(bookResults);
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
          <BookCards bData={books} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    books: state.books.data,
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
    loadedUserBooks: (data) =>
      dispatch({ type: "USERBOOKS_LOADED", data: data }),
    loadedJoinedBooks: (data) =>
      dispatch({ type: "JOINED_LOADED", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lend);

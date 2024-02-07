import axios from "axios";
import React, { useState } from "react";
import BookLists from "../BookLists";
import BookCards from "./BookCards";
import "./index.css";

function Lend() {
  const [value, modifier] = useState({ value: "" });
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

export default Lend;

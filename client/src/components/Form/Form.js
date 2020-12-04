import React, { useState } from "react";
import "./form.css";
import axios from "axios";
import BookCards from "../BookCards/BookCards";

function Form() {
  const [value, modifier] = useState({ value: " " });
  let [books, booksModifier] = useState([]);

  function handleSearch() {
    axios
      .request({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${value.value}`,
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
    <div>
      <div className="form">
        <input
          className="searchInput"
          type="text"
          placeholder="find your book"
          onChange={(e) => {
            modifier({ value: e.target.value });
          }}
        ></input>
        <button className="searchBtn" onClick={handleSearch}>
          search
        </button>
      </div>
      <div>
        <BookCards bData={books} />
      </div>
    </div>
  );
}

export default Form;

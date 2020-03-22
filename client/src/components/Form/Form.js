import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [value, modifier] = useState({ value: " " });
  let [book, booksModifier] = useState({ books: [] });

  function handleSearch() {
    axios
      .request({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${value.value}`
      })
      .then(response => {
        let bookData = response.data.items;
        console.log(bookData);
        let bookResults = [];
        for (var i = 0; i < bookData.length; i++) {
          let bookInfo = bookData[i].volumeInfo;
          //console.log(bookInfo.imageLinks.thumbnail);
          let book = {
            title: bookInfo.title,
            author: bookInfo.authors[0],
            description: bookInfo.description,
            link: bookInfo.infoLink
            // image: bookInfo.imageLinks.thumbnail
          };
          bookResults.push(book);
        }
        booksModifier({ books: bookResults });

        console.log(bookResults);
      });
    // booksModifier: response.data.items
  }
  return (
    <div>
      <div className="form">
        <input
          className="searchInput"
          type="text"
          onChange={e => {
            modifier({ value: e.target.value });
          }}
        ></input>
        <button className="searchBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="book-display"></div>
    </div>
  );
}

export default Form;

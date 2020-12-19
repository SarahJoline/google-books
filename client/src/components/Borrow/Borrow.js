import React, { useState, useEffect } from "react";
import "./borrow.css";

function Borrow() {
  let [searchBorrow, setSearch] = useState(" ");
  let [borrowBooks, setBorrow] = useState();

  function getBooks() {
    console.log("GET BOOKS");

    fetch(`/api/borrow-books/${searchBorrow}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="borrow-page">
      <input
        className="searchBorrow"
        type="text"
        placeholder="Search for books to borrow"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            getBooks();
          }
        }}
      ></input>
      <div className="available-books">58 books available</div>
      <div className="location">within 10 miles of 2330 Larkin</div>
      <div className="books-to-borrow">Books!</div>
    </div>
  );
}

export default Borrow;

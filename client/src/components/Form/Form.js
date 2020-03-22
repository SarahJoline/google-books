import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [value, modifier] = useState({ value: " " });
  let [book, booksModifier] = useState({ books: [] });

  function handleSearch() {
    axios
      .request({
        method: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=" + "harry+potter"
      })
      .then(response =>
        this.setState({
          books: response.data
        })
      );
  }
  return (
    <div>
      <div className="form">
        <input className="searchInput" type="text"></input>
        <button className="searchBtn">Search</button>
      </div>
    </div>
  );
}

export default Form;

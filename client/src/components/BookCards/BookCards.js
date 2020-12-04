import React, { useState } from "react";
import axios from "axios";
import "./bookcards.css";

function BookCards(props) {
  let [intent, setIntent] = useState();
  const books = props.bData;

  function addBooks(event, books) {
    axios
      .post("/api/mybooks", {
        id: books.id,
        title: books.title,
        authors: books.authors,
        description: books.description,
        link: books.link,
        image: books.image,
        intent: intent,
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  let bookArray = books.map((books, index) => {
    return (
      <div className="book-card" key={books.id}>
        <div className="image-div">
          <a href={books.link}>
            <img src={books.image} alt={books.title} />
          </a>
        </div>

        {/* <h3>{books.title}</h3>
        <p>{books.authors}</p> */}
        <div className="button-div">
          <button
            className="save-button"
            onClick={(event) => {
              setIntent("to lend");
              addBooks(event, books);
            }}
            id={books.id}
            data={books}
          >
            Lend
          </button>
          <button
            className="save-button"
            onClick={(event) => {
              setIntent("to borrow");
              addBooks(event, books);
            }}
            id={books.id}
            data={books}
          >
            Borrow
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="wrap-container">
      <div className="book-container">{bookArray}</div>
    </div>
  );
}

export default BookCards;

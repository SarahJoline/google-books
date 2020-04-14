import React from "react";
import axios from "axios";
import "./bookcards.css";

function BookCards(props) {
  const books = props.bData;

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
              saveBook(event, books);
            }}
            id={books.id}
            data={books}
          >
            save book
          </button>
        </div>
      </div>
    );
  });

  function saveBook(event, books) {
    axios
      .post("/api/saved", {
        id: books.id,
        title: books.title,
        authors: books.authors,
        description: books.description,
        link: books.link,
        image: books.image,
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
  return (
    <div className="wrap-container">
      <div className="book-container">{bookArray}</div>
    </div>
  );
}

export default BookCards;

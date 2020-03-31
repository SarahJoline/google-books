import React from "react";
import axios from "axios";

function BookCards(props) {
  const books = props.bData;

  console.log("bookCards: " + JSON.stringify(books));

  let bookArray = books.map((books, index) => {
    return (
      <div key={books.id}>
        <h3>{books.title}</h3>
        <p>{books.description}</p>
        <a href={books.link}>More Info</a>
        <button
          className="save-button"
          onClick={event => {
            saveBook(event, books);
          }}
          id={books.id}
        >
          Save Book
        </button>
      </div>
    );
  });

  function saveBook(event, books) {
    axios
      .post("/new", {
        id: books.id,
        title: books.title,
        authors: books.authors,
        description: books.description,
        link: books.link
        // image: books.image
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }
  return <div>{bookArray}</div>;
}

export default BookCards;

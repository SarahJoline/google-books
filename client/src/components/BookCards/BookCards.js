import React from "react";
import axios from "axios";

function BookCards(props) {
  const books = props.bData;

  let bookArray = books.map((books, index) => {
    return (
      <div key={books.id}>
        <h3>{books.title}</h3>
        <img src={books.image} alt={books.title}></img>
        <p>{books.authors}</p>
        <a href={books.link}>More Info</a>
        <button
          className="save-button"
          onClick={event => {
            saveBook(event, books);
          }}
          id={books.id}
          data={books}
        >
          Save Book
        </button>
      </div>
    );
  });

  function saveBook(event, books) {
    axios
      .post("/saved", {
        id: books.id,
        title: books.title,
        authors: books.authors,
        description: books.description,
        link: books.link,
        image: books.image
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

import React, { useState } from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import "./bookcards.css";

function BookCards(props) {
  let [intent, setIntent] = useState();
  const books = props.bData;

  function addBooks(event, books) {
    AuthHelperMethods.fetch(`/api/savebook/${books.id}`, {
      method: "POST",
      body: JSON.stringify({
        id: books.id,
        title: books.title,
        authors: books.authors,
        description: books.description,
        link: books.link,
        image: books.image,
        intent: intent,
      }),
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  let bookArray = books.map((books, index) => {
    return (
      <div className="book-card" key={books.id}>
        <img className="book-image" src={books.image} alt={books.title} />

        <div className="button-div">
          <button
            className="lend-button"
            onClick={(event) => {
              setIntent("to lend");
              addBooks(event, books);
            }}
            id={books.id}
            data={books}
          >
            LEND
          </button>
        </div>
      </div>
    );
  });

  return <div className="book-container">{bookArray}</div>;
}

export default BookCards;

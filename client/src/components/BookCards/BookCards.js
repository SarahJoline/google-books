import React from "react";
import axios from "axios";

function BookCards(props) {
  function saveBook(event, item) {
    axios
      .post("/save", {
        id: item.id,
        title: item.title,
        authors: item.authors,
        description: item.description,
        link: item.link
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  }

  const books = props.book;

  console.log("bookCards: " + books);

  //use .map here to render each book as well as a button to POST the book to
  //our saved books
  // let bookArray = books.map((item, index) => {
  return (
    <div>
      {/* <h3>{book.title}</h3>
        <p>{book.description}</p>
        <a href={book.link}>Click here for more info</a>*/}
      <button className="save-button" onClick={saveBook}>
        Save Book
      </button>
    </div>
  );
  // });
}

export default BookCards;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./saved.css";
import _ from "lodash";
import Booklists from "../BookLists/BookLists";

function Saved() {
  let [sortedBooks, setSorted] = useState();

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    axios
      .get("/api/allsaved")
      .then((savedBooks) => {
        const allBooks = savedBooks.data;
        const sortBooks = _.groupBy(allBooks, "intent");
        setSorted(sortBooks);
      })
      .catch((err) => console.log(err));
  }

  function deleteBook(book) {
    const id = book.target.id;
    axios.delete(`/api/delete/${id}`).then((res) => {
      getBooks();
    });
  }

  const bookLists = [];

  for (let intent in sortedBooks) {
    bookLists.push(
      <div className="booklist-container" key={intent}>
        <div className="book-list-div">
          <h2 className="book-list-name">Books {intent}</h2>
        </div>
        <Booklists listsOfBooks={sortedBooks[intent]} deleteBook={deleteBook} />
      </div>
    );
  }

  return sortedBooks !== undefined ? <div>{bookLists}</div> : <div></div>;
}

export default Saved;

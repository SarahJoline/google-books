import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./saved.css";
import _ from "lodash";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import Booklists from "../BookLists/BookLists";

function Saved(props) {
  let [sortedBooks, setSorted] = useState();

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    console.log("GET BOOKS");

    AuthHelperMethods.fetch("/api/mybooks")
      .then((savedBooks) => {
        const allBooks = savedBooks.data[0].books;
        const sortBooks = _.groupBy(allBooks, "intent");
        setSorted(sortBooks);

        props.loadedBooks(allBooks);
      })
      .catch((err) => console.log(err));
  }

  function deleteBook(book) {
    const id = book.target.id;
    console.log("id: ", id);
    console.log(book);
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

// const mapStateToProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Saved);

export default Saved;

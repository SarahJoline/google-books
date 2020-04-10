import React, { useState, useEffect } from "react";
import axios from "axios";

function Saved() {
  let [books, booksModifier] = useState({ saved: [] });

  useEffect(() => {
    axios
      .get("/api/allsaved")
      .then((savedBooks) => {
        booksModifier({ saved: savedBooks });
      })
      .catch((err) => console.log(err));
  }, []);

  function deleteBook(book) {
    const id = book.target.id;
    axios.delete(`/api/delete/${id}`).then((res) => {
      axios.get("/api/allsaved").then((savedBooks) => {
        booksModifier({ saved: savedBooks });
      });
    });
  }
  let savedArr = !books.saved.data ? [] : books.saved.data;
  return (
    <div>
      {savedArr !== undefined ? (
        <div>
          {savedArr.map((book) => (
            //console.log(book);
            <div className="container" key={book._id}>
              <div className="card">
                <div className="savedBooks">
                  <h3>{book.title}</h3>
                  <p>{book.authors}</p>
                  <a href={book.link}>More Info</a>
                  <button
                    className="delete"
                    onClick={(event) => {
                      deleteBook(event, book);
                    }}
                    id={book._id}
                    data={book}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h4>Nothing Yet!</h4>
        </div>
      )}
    </div>
  );
}

export default Saved;

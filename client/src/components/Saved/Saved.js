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
  console.log(savedArr);

  return (
    <div>
      {savedArr !== null ? (
        <div className="container">
          {savedArr.map((res) => (
            //console.log(book);
            <div className="bookCard" key={res._id}>
              <div className="card">
                <div className="savedBooks">
                  <h3>{res.title}</h3>
                  <p>{res.authors}</p>
                  <a href={res.link}>More Info</a>
                  <button
                    className="delete"
                    onClick={(event) => {
                      deleteBook(event);
                    }}
                    id={res._id}
                    data={res}
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

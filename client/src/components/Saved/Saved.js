import React, { useState, useEffect } from "react";
import axios from "axios";
import "./saved.css";

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

  return savedArr !== undefined ? (
    <div className="book-container">
      {savedArr.map((res) => (
        <div className="book-card" key={res._id}>
          <div className="card">
            <div className="savedBooks">
              <div className="image-div">
                <a href={res.link}>
                  <img src={res.image} alt={res.title} />
                </a>
              </div>
              {/* <h3>{res.title}</h3>
              <p>{res.authors}</p> */}
              <div className="button-div">
                <button
                  className="delete"
                  onClick={(event) => {
                    deleteBook(event);
                  }}
                  id={res._id}
                  data={res}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="container">
      <div>
        <h4>Nothing Yet!</h4>
      </div>
    </div>
  );
}

export default Saved;

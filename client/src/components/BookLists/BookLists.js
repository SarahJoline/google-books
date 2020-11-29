import React from "react";
import axios from "axios";
import "./bookLists.css";

function BookList(props) {
  const listData = props.listsOfBooks;
  const deleteBook = props.deleteBook;
  console.log(listData);

  return listData !== undefined ? (
    <div className="booklist">
      {listData.map((res) => (
        <div className="booklist-card">
          <div className="image-div">
            <a href={res.link}>
              <img src={res.image} alt={res.title} />
            </a>
          </div>
          <div className="button-div">
            <button
              className="delete-btn"
              onClick={(event) => {
                deleteBook(event, res._id);
              }}
              id={res._id}
              data={res}
            >
              delete
            </button>
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

export default BookList;

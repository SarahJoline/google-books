import React, { useState, useEffect } from "react";
import axios from "axios";

function Saved() {
  <h1>Something worked</h1>;
  //   let [books, booksModifier] = useState({ saved: [] });

  //   useEffect(() => {
  //     axios
  //       .get("/allsaved")
  //       .then(savedBooks => {
  //         booksModifier({ saved: savedBooks });
  //       })
  //       .catch(err => console.log(err));
  //   }, []);

  //   function deleteBook(book) {
  //     const id = book.target.id;
  //     axios.delete(`/delete/${id}`).then(res => {
  //       axios.get("/allsaved").then(savedBooks => {
  //         booksModifier({ saved: savedBooks });
  //       });
  //     });
  //   }

  //   const renderSaved = () => {
  //     let savedArr = !books.saved.data ? [] : books.saved.data;
  //     console.log(savedArr);
  //     return savedArr.map((book, index) => {
  //       console.log(book);
  //       return (
  //         <div className="container" key={book._id}>
  //           <div className="card">
  //             <div className="savedBooks">
  //               <h3>{book.title}</h3>
  //               <p>{book.authors}</p>
  //               <a href={book.link}>More Info</a>
  //               <button
  //                 className="delete"
  //                 onClick={event => {
  //                   deleteBook(event, book);
  //                 }}
  //                 id={book._id}
  //                 data={book}
  //               >
  //                 Delete
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     });
  //   };
  //   return <div>{renderSaved()}</div>;
}

export default Saved;

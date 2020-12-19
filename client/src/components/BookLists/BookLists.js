import React from "react";
import { connect } from "react-redux";

import "./bookLists.css";

function BookList(props) {
  const listData = props.listsOfBooks;
  const deleteBook = props.deleteBook;

  //   return listData !== undefined ? (
  //     <div className="booklist">
  //       {props.numberOfSarahKisses}
  //       {listData.map((res) => (
  //         <div className="booklist-card" key={res._id}>
  //           <div className="book-div">
  //             <div className="book-title">Burial Rites</div>
  //             <div className="book-author">Hannah Kent</div>
  //           </div>
  //           <div className="button-div">
  //             <button
  //               className="delete-btn"
  //               onClick={(event) => {
  //                 deleteBook(event, res._id);
  //               }}
  //               id={res._id}
  //               data={res}
  //             >
  //               delete
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   ) : (
  //     <div className="container">
  //       <div>
  //         <h4>Nothing Yet!</h4>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="booklist">
      <div className="booklist-content">
        <div className="lending">Books you're lending</div>
        <div className="lending-number">3 books</div>
        <div className="booklist-div">
          <div className="lend-book-card">
            <div className="book-info">
              <div className="book-title">Burial Rites</div>
              <div className="book-author">Hannah Kent</div>
            </div>
            <div className="button-div">
              <img className="trash-btn" src="./Group.png" alt="X" />
            </div>
          </div>
          <div className="lend-book-card">
            <div className="book-info">
              <div className="book-title">Burial Rites</div>
              <div className="book-author">Hannah Kent</div>
            </div>
            <div className="button-div">
              <img className="trash-btn" src="./Group.png" alt="X" />
            </div>
          </div>
          <div className="lend-book-card">
            <div className="book-info">
              <div className="book-title">Burial Rites</div>
              <div className="book-author">Hannah Kent</div>
            </div>
            <div className="button-div">
              <img className="trash-btn" src="./Group.png" alt="X" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookList;

// Access part of the redux store from this component!
// const mapStateToProps = (state) => {
//   return {
//     numberOfSarahKisses: state.don.kissCounter,
//   };
// };

// export default connect(mapStateToProps)(BookList);

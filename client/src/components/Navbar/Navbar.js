import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="container">
      <h1>Book Swap</h1>
      <div className="anchor-div">
        <a href="/searchbooks">Search </a>|<a href="/mysaved"> Saved Books</a>
      </div>
      <button className="logoutBtn">Logout</button>
    </div>
  );
}

export default Navbar;

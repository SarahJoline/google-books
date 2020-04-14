import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="container">
      <h1>Google Books</h1>
      <div className="anchor-div">
        <a href="/">Home </a>|<a href="/mysaved"> Saved Books</a>
      </div>
    </div>
  );
}

export default Navbar;

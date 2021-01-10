import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dialog from "@material-ui/core/Dialog";
import Menu from "@material-ui/core/Menu";
import _ from "lodash";
import axios from "axios";
import "./navbar.css";

function LendButton() {
  return (
    <Link to={"/lend"}>
      <button className="lendBtn">LEND</button>
    </Link>
  );
}

function BorrowButton() {
  return (
    <Link to={"/borrow"}>
      <button className="borrowBtn">BORROW</button>
    </Link>
  );
}

function LoggedInContent(props) {
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);
  const [lending, setLending] = useState(false);

  if (userData) {
    // console.log(userData.email);
    // console.log(userData.userID);
  }

  let spot = useLocation();

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    manageButtons();
  }, [spot]);

  function logout() {
    AuthHelperMethods.logout("id_token");
    window.location.href = "/borrow";
  }

  function getUserInfo() {
    const userInfo = AuthHelperMethods.decodeToken();
    setUserData(userInfo);
  }

  function manageButtons() {
    if (spot.pathname === "/lend") {
      setLending(true);
    } else if (spot.pathname === "/borrow") {
      setLending(false);
    }
  }

  return (
    <div className="btn-div">
      {lending ? <BorrowButton /> : <LendButton />}
      <div className="user-info">
        <div
          className="user-email"
          onClick={(e) => {
            setOpen(true);
          }}
        >
          {userData ? userData.email : " "}
        </div>
        <div className="user-book-num">
          {/* <img src="/assets/Vector.svg" alt="X" /> */}
          LENDING 23 BOOKS
        </div>

        <Menu
          id="logout-menu"
          open={open}
          onClose={() => setOpen(false)}
          elevation={4}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <button
            className="logoutBtn"
            onClick={(e) => {
              logout();
            }}
          >
            Logout
          </button>
        </Menu>
      </div>
    </div>
  );
}

function LoggedOutContent() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div className="btn-div">
      <button
        className="loginBtn"
        onClick={(e) => {
          setOpenLogin(true);
        }}
      >
        LOGIN
      </button>
      <button
        className="registerBtn"
        onClick={(e) => {
          setOpenRegister(true);
        }}
      >
        SIGN UP
      </button>
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <Login onClose={() => setOpenLogin(false)} />
      </Dialog>
      <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
        <Register onClose={() => setOpenRegister(false)} />
      </Dialog>
    </div>
  );
}

function Navbar(props) {
  const loggedIn = AuthHelperMethods.loggedIn();
  const books = props.books;
  const userBooks = props.userBooks;

  useEffect(() => {
    getAllBooks();
  }, []);

  async function getAllBooks() {
    try {
      await axios
        .request({
          method: "GET",
          url: "/api/books",
        })
        .then((res) => {
          props.loadedBooks(res.data);
        });

      await axios
        .request({
          method: "GET",
          url: "/api/userbooks",
        })
        .then((res) => {
          props.loadedUserBooks(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    joinBooks();
  }, [books, userBooks]);

  let displayBooks = [];

  function joinBooks() {
    let orderedBooks = _.orderBy(userBooks, ["borrowerID"], ["desc"]);
    if (books !== undefined && userBooks !== undefined) {
      for (var i = 0; i < orderedBooks.length; i++) {
        let foundBook = _.find(books, { _id: orderedBooks[i].bookID });
        let joinedBook = { ...foundBook, ...orderedBooks[i] };
        displayBooks.push(joinedBook);
      }

      props.loadedJoinedBooks(displayBooks);
    }
  }

  return (
    <div className="container">
      <div className="app-name">Book Swap</div>

      {loggedIn ? <LoggedInContent /> : <LoggedOutContent />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    books: state.books.data,
    userBooks: state.userBooks.data,
    joinedBooks: state.joinedBooks.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
    loadedUserBooks: (data) =>
      dispatch({ type: "USERBOOKS_LOADED", data: data }),
    loadedJoinedBooks: (data) =>
      dispatch({ type: "JOINED_LOADED", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

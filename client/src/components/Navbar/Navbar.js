import React, { useState, useEffect } from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dialog from "@material-ui/core/Dialog";
import Menu from "@material-ui/core/Menu";
import "./navbar.css";

function LendButton() {
  return (
    <button
      className="lendBtn"
      onClick={(e) => {
        window.location.href = "/lend";
      }}
    >
      LEND
    </button>
  );
}

function BorrowButton() {
  return (
    <button
      className="borrowBtn"
      onClick={(e) => {
        window.location.href = "/borrow";
      }}
    >
      BORROW
    </button>
  );
}

function LoggedInContent() {
  const [userEmail, setUser] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getInfoBitch();
  }, []);

  function logout() {
    AuthHelperMethods.logout("id_token");
    window.location.href = "/";
  }

  function getInfoBitch() {
    const bitchInfo = AuthHelperMethods.decodeToken();
    setUser(bitchInfo.email);
  }

  return (
    <div className="btn-div">
      <LendButton />
      <div className="user-info">
        <div
          className="user-email"
          onClick={(e) => {
            setOpen(true);
          }}
        >
          {userEmail}
        </div>
        <div className="user-book-num">
          <img src="/assets/Vector.svg" />
          LENDING 23 BOOKS
        </div>
        <Menu id="logout-menu" open={open} onClose={() => setOpen(false)}>
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

function Navbar() {
  const loggedIn = AuthHelperMethods.loggedIn();
  console.log(loggedIn);
  return (
    <div className="container">
      <div className="app-name">Book Swap</div>

      {loggedIn ? <LoggedInContent /> : <LoggedOutContent />}
    </div>
  );
}

export default Navbar;

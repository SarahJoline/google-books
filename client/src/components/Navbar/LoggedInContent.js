import Menu from "@mui/material/Menu";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import "./index.css";

function LendButton() {
  return (
    <Link to={"/lend"}>
      <button className="lendBtn">LEND</button>
    </Link>
  );
}

function BorrowButton() {
  return (
    <Link to={"/"}>
      <button className="borrowBtn">BORROW</button>
    </Link>
  );
}

function LoggedInContent(props) {
  const [userData, setUserData] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const [open, setOpen] = useState(false);
  const [lending, setLending] = useState(false);

  let spot = useLocation();

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    manageButtons();
  }, [spot, manageButtons]);

  function logout() {
    AuthHelperMethods.logout("id_token");
    window.location.href = "/";
  }

  function handleClick(e) {
    setAnchorEl(e.target);
    setOpen(true);
  }

  function getUserInfo() {
    const userInfo = AuthHelperMethods.decodeToken();

    setUserData(userInfo);
  }

  function manageButtons() {
    if (spot.pathname === "/lend") {
      setLending(true);
    } else if (spot.pathname === "/") {
      setLending(false);
    }
  }

  let myBooks;

  if (userData) {
    myBooks = _.filter(props.joinedBooks, {
      lenderID: userData.userID,
    });
  }

  return (
    <div className="btn-div">
      {lending ? <BorrowButton /> : <LendButton />}
      <div className="user-info">
        <div
          className="user-email"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <header> {userData ? userData.email : " "}</header>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </div>
        <div className="user-book-num">
          {/* <img src="/assets/Vector.svg" alt="X" /> */}
          LENDING {myBooks ? myBooks.length : "0"} BOOKS
        </div>

        <Menu
          id="logout-menu"
          open={open}
          onClose={() => setOpen(false)}
          elevation={4}
          anchorEl={anchorEl}
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

const mapStateToProps = (state) => {
  return {
    joinedBooks: state.joinedBooks.data,
  };
};

export default connect(mapStateToProps, null)(LoggedInContent);

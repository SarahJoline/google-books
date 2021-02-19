import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import Menu from "@material-ui/core/Menu";
import _ from "lodash";
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
  }, [spot]);

  function logout() {
    AuthHelperMethods.logout("id_token");
    window.location.href = "/";
  }

  function handleClick(e) {
    setAnchorEl(e.target)
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
            handleClick(e)
          }}
        >
          {userData ? userData.email : " "}
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

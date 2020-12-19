import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./login.css";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";

function Login(props) {
  let [login, setLogin] = useState({ email: " ", password: " " });

  function sendLogin() {
    axios
      .post("/api/log-in", {
        email: login.email,
        password: login.password,
      })
      .then((res) => {
        console.log("login working");
        AuthHelperMethods.setToken(res.data.token);
        window.location.href = "/searchbooks";
        // getBooks();
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  return (
    <div className="loginFormConatiner">
      <div className="loginForm">
        <input
          className="emailInput"
          placeholder="email"
          onChange={(e) => {
            setLogin({ ...login, email: e.target.value });
          }}
        />
        <input
          className="passwordInput"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setLogin({ ...login, password: e.target.value });
          }}
        />
        <button
          className="loginBtn"
          onClick={(e) => {
            sendLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadedBooks: (data) => dispatch({ type: "BOOKS_LOADED", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";

function Login() {
  let [login, setLogin] = useState({ email: " ", password: " " });

  function sendLogin() {
    axios
      .post("/api/log-in", {
        email: login.email,
        password: login.password,
      })
      .then((res) => {
        console.log("login working");
        console.log(res);
        AuthHelperMethods.setToken(res.data.token);
        window.location.href = "/mysaved";
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  return (
    <div className="loginFormConatiner">
      <h3>Log in</h3>
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
        <a href="/register">Make an account</a>
      </div>
    </div>
  );
}

export default Login;

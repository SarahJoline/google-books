import React, { useState } from "react";
import axios from "axios";

function Login() {
  let [login, setLogin] = useState({ email: " ", password: " " });

  function sendLogin() {
    axios
      .post("/api/log-in", {
        email: login.email,
        password: login.password,
      })
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div className="loginFormConatiner">
      <div className="loginform">
        <input
          className="emailInput"
          placeholder="email"
          onChange={(e) => {
            setLogin({ ...login, email: e.target.value });
          }}
        />
        <input
          className="passwordInput"
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

export default Login;

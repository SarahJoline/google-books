import React, { useState } from "react";
import AuthHelperMethods from "../../helpers/AuthHelperMethods";
import axios from "axios";
import "./register.css";

function Register() {
  let [register, setRegister] = useState({
    email: " ",
    name: " ",
    password: " ",
  });

  function registerUser() {
    axios
      .post("/api/signup", {
        email: register.email,
        name: register.name,
        password: register.password,
      })
      .then((res) => {
        AuthHelperMethods.setToken(res.data.token);
        window.location.href = "/searchbooks";
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  return (
    <div className="registerFormConatiner">
      <h3>Register</h3>
      <div className="registerform">
        <input
          className="registerEmail"
          placeholder="email"
          onChange={(e) => {
            setRegister({ ...register, email: e.target.value });
          }}
        />
        <input
          className="registerName"
          placeholder="name"
          onChange={(e) => {
            setRegister({ ...register, name: e.target.value });
          }}
        />
        <input
          className="registerPassword"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setRegister({ ...register, password: e.target.value });
          }}
        />
        <button
          className="registerBtn"
          onClick={(e) => {
            registerUser();
          }}
        >
          Begin!
        </button>
      </div>
    </div>
  );
}

export default Register;

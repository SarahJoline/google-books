import React, { useState } from "react";
import axios from "axios";

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
        console.log("register working");
        console.log(res);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  return (
    <div className="registerFormConatiner">
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

import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import Login from "../Login";
import Register from "../Register";

import "./index.css";

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
        LOG IN
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

export default LoggedOutContent;

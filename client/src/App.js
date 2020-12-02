import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Saved from "./components/Saved/Saved";
import Form from "./components/Form/Form";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />

          <Route exact path="/register" component={Register} />

          <Route exact path="/" component={Form} />

          <Route exact path="/mysaved" component={Saved} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

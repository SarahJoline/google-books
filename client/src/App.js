import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// import axios from "axios";
// import Saved from "./components/Saved/Saved";
// import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";

import saved from "./pages/saved";
import home from "./pages/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/mysaved" component={saved} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

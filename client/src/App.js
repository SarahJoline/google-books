import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Saved from "./components/Saved/Saved";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Form} />
          <Route exact path="/mysaved" component={Saved} />>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

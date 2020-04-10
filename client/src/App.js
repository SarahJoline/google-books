import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Saved from "./components/Saved/Saved";
import Form from "./components/Form/Form";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Form />
          </Route>
          <Route exact path="/mysaved">
            <Saved />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

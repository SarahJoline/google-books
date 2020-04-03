import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import saved from "./pages/saved";
import home from "./pages/home";
import Saved from "./components/Saved/Saved";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={home}>
            <Form />
          </Route>
          <Route exact path="/mysaved" component={saved}>
            <Saved />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

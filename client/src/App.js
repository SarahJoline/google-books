import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Saved from "./components/Saved/Saved";

function App() {
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=" + "harry+potter"
      })
      .then(response => console.log(response));
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/saved">
            <Saved />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

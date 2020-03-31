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
  // searchBooks() {
  //   axios
  //     .request({
  //       method: "GET",
  //       url: "https://www.googleapis.com/books/v1/volumes?q=" + "harry+potter"
  //     })
  //     .then(response =>
  //       this.setState({
  //         books: response.data
  //       })
  //     );
  // }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/saved" component={saved} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

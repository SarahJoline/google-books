import React, { useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Saved from "./components/Saved/Saved";
import Search from "./components/Search/Search";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
    this.searchBooks = this.searchBooks.bind(this);
  }

  searchBooks() {
    axios
      .request({
        method: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=" + "harry+potter"
      })
      .then(response =>
        this.setState({
          books: response.data
        })
      );
  }

  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Search books={books} searchBooks={this.searchBooks} />
            </Route>
            <Route exact path="/saved">
              <Saved />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

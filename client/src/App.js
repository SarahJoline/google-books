import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import BorrowPage from "./components/BorrowPage";
import LendPage from "./components/LendPage";

import store from "./redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/lend" component={LendPage} />

            <Route exact path="/borrow" component={BorrowPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

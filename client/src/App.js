import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Borrow from "./components/Borrow/Borrow";
import Lend from "./components/Lend/Lend";

import store from "./redux";

// import KissSarahButton from "./components/KissSarahButton";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          {/* <KissSarahButton /> */}
          <Switch>
            <Route exact path="/lend" component={Lend} />

            <Route exact path="/borrow" component={Borrow} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

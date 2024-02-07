import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BorrowPage from "./components/BorrowPage";
import LendPage from "./components/LendPage";
import Navbar from "./components/Navbar";

import store from "./redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/lend" element={<LendPage />} />

            <Route path="/" element={<BorrowPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

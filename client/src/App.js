import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("/example").then(response => console.log(response));
  }, []);
  return (
    <div className="App">
      <h1>Heyyy</h1>
    </div>
  );
}

export default App;

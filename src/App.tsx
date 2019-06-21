import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { getAnyDeviceAsync } from "./Central";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div
          className="App-link"
          onClick={() => {
            getAnyDeviceAsync();
          }}
          style={{ cursor: "pointer" }}
        >
          Scan Device
        </div>
      </header>
    </div>
  );
};

export default App;

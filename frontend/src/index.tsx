import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styling/index.css";
import App from "./App";
import UserContextProvider from "./contexts/UserContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

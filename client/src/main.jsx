import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Entry from "./Entry";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Entry />
  </BrowserRouter>,
);

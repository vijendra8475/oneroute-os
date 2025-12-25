import React from "react";
import ReactDOM from "react-dom/client";
import { auth } from "./firebase";

console.log("Firebase Auth:", auth);

ReactDOM.createRoot(document.getElementById("root")).render(
  <h1>OneRoute OS – Firebase Connected</h1>
);

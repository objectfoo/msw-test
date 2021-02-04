import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./app";
import reportWebVitals from "./reportWebVitals";


if (process.env.NODE_ENV !== "production") {
	const { worker } = require("./api/dev-server");
	worker.start()
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

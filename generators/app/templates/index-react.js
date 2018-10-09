import "@babel/polyfill";
<% if (includeSass) { %>import "../styles/main.scss";<% } else { %>import "../styles/main.css";<% } %>

import React from "react";
import { render } from "react-dom";
import App from "./App.js";

render(<App />, document.getElementById("container"));

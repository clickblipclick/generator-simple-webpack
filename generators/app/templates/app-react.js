import React from "react";
import { hot } from "react-hot-loader";

const App = () => (
  <div className="intro">
    <h1>Hi there.</h1>
    <p>You now have a site with:</p>
    <ul>
      <li>
        <a
          href="https://webpack.js.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Webpack 4
        </a>
      </li>
      <li>
        <a
          href="https://webpack.js.org/concepts/hot-module-replacement/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Hot Module Replacement
        </a>
      </li>
      <li>
        <a
          href="https://github.com/postcss/autoprefixer"
          rel="noopener noreferrer"
          target="_blank"
        >
          Autoprefixer
        </a>
      </li><% if (includeReact) { %>
      <li>
        <a
          href="https://reactjs.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          React
        </a>
      </li><% } %><% if (includeSass) { %>
      <li>
        <a
          href="https://sass-lang.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sass
        </a>
      </li><% } %><% if (includeBabel) { %>
      <li>
        <a href="https://babeljs.io/" rel="noopener noreferrer" target="_blank">
          Babel
        </a>
      </li><% } %><% if (includePrettier) { %>
      <li>
        <a
          href="https://prettier.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Prettier
        </a>
      </li><% } %>
    </ul>
  </div>
);

export default hot(module)(App);

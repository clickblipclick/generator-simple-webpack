<% if (includeSass) { %>import '../styles/main.scss';<% } else { %>import '../styles/main.css';<% } %>

import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return <div className="intro">
      <h1>Welcome to your generated site</h1>
    </div>
  }
}

render(<App />, document.getElementById('container'));

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Menubar from './components/Menubar.js'
import QlueMap from './components/Map.js'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Menubar />
          <QlueMap />
      </div>
    );
  }
}

export default App;

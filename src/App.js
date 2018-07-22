import React, { Component } from 'react';
import './App.css';
import 'foundation-sites';
import 'foundation-sites/dist/css/foundation.min.css';
import TopBar from './components/top-bar';
import Minesweeper from './components/minesweeper';

class App extends Component {
  render() {
    return (
      <div className="grid-y grid-padding-y">
        <TopBar className="cell" />
        <Minesweeper />
      </div>
    );
  }
}

export default App;

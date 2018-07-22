import React, { Component } from 'react';
import './App.css';
import 'foundation-sites';
import 'foundation-sites/dist/css/foundation.min.css';
import TopBar from './components/top-bar';
import BoardSettings from './components/board-settings';

class App extends Component {
  render() {
    return (
      <div className="grid-y grid-padding-y">
        <TopBar className="cell" />
        <BoardSettings className="cell" />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dist/styles/App.css';
import Navbar from './components/navbar';
import Minesweeper from './components/minesweeper';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <Minesweeper />
        </div>
      </div>
    );
  }
}

export default App;

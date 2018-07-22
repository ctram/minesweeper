import React, { Component } from 'react';
import Minesweeper from './lib/minesweeper';

export default class BoardSettings extends Component {
  constructor(props) {
    super(props);
    this.state = { board: new Board() };
  }

  updateBoard() {
    console.log('here!');
  }

  render() {
    const { board } = this.state;

    return (
      <div className="grid-container">
        <header className="text-center">Board Settings</header>
        <form>
          <div class="medium-4 cell">
            <label>
              Width
              <input type="number" />
            </label>
          </div>
          <div class="medium-4 cell">
            <label>
              Height
              <input type="number" />
            </label>
          </div>
          <div className="medium-4 cell">
            <button type="button" className="button" onClick={this.updateBoard}>
              Create Board
            </button>
          </div>
        </form>
        <hr />
      </div>
    );
  }
}

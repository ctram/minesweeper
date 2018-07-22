import React, { Component } from 'react';

export default class BoardSettings extends Component {
  constructor(props) {
    super(props);
  }

  updateBoard() {
    console.log('here!');
  }

  render() {
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

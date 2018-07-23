import React, { Component } from 'react';

export default class BoardSettings extends Component {
  constructor(props) {
    super(props);
    this.handeChange = this.handeChange.bind(this);
    this.newBoard = this.newBoard.bind(this);
    this.state = { width: 3, height: 3 };
  }

  newBoard() {
    const y = Number(this.refs['input-width'].value);
    const x = Number(this.refs['input-height'].value);
    this.props.handleNewBoard(x, y);
  }

  handeChange() {
    const data = {};
    ['width', 'height'].forEach(ref => {
      const value = this.refs[`input-${ref}`].value;
      data[ref] = value;
    });
    this.setState(data);
  }

  render() {
    return (
      <div className="grid-container">
        <header className="text-center">Board Settings</header>
        <form>
          <div className="medium-4 cell">
            <label>
              Width
              <input
                type="number"
                ref="input-width"
                min="1"
                value={this.state.width}
                onChange={this.handeChange}
              />
            </label>
          </div>
          <div className="medium-4 cell">
            <label>
              Height
              <input
                type="number"
                ref="input-height"
                min="1"
                value={this.state.height}
                onChange={this.handeChange}
              />
            </label>
          </div>
          <div className="medium-4 cell">
            <button type="button" className="button" onClick={this.newBoard}>
              Create Board
            </button>
          </div>
        </form>
        <hr />
      </div>
    );
  }
}

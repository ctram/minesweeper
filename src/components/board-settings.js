import React, { Component } from 'react';

export default class BoardSettings extends Component {
  constructor(props) {
    super(props);
    const { game } = props;
    const { width, height, numMines: mines } = game.attrs;
    this.handeChange = this.handeChange.bind(this);
    this.newBoard = this.newBoard.bind(this);
    this.state = { width, height, mines };
  }

  newBoard(e) {
    e.preventDefault();
    const y = Number(this.refs['input-width'].value);
    const x = Number(this.refs['input-height'].value);
    const numMines = Number(this.refs['input-mines'].value);
    this.props.handleNewBoard(x, y, numMines);
  }

  handeChange() {
    const data = {};
    ['width', 'height', 'mines'].forEach(ref => {
      const value = this.refs[`input-${ref}`].value;
      data[ref] = value;
    });
    this.setState(data);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.newBoard}>
        <div className="form-group">
          <label htmlFor="input-width" className="mr-3">
            Width
          </label>
          <input
            id="input-width"
            className="form-control"
            type="number"
            ref="input-width"
            min="1"
            max="25"
            placeholder="width"
            value={this.state.width}
            onChange={this.handeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-height" className="mx-3">
            Height
          </label>
          <input
            id="input-height"
            className="form-control"
            type="number"
            ref="input-height"
            min="1"
            max="25"
            placeholder="height"
            value={this.state.height}
            onChange={this.handeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-mines" className="mx-3">
            Mines
          </label>
          <input
            id="input-mines"
            className="form-control"
            type="number"
            ref="input-mines"
            min="1"
            placeholder="number of mines"
            value={this.state.mines}
            onChange={this.handeChange}
          />
        </div>
        <button className="btn btn-primary ml-3" onClick={this.newBoard}>
          Create Board
        </button>
        <small className="form-text text-muted ml-3">
          Creating a new board will quit the current game!
        </small>
      </form>
    );
  }
}

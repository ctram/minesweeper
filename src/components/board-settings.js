import React, { Component } from 'react';

export default class BoardSettings extends Component {
  constructor(props) {
    super(props);
    this.handeChange = this.handeChange.bind(this);
    this.newBoard = this.newBoard.bind(this);
    this.state = { width: 3, height: 3 };
  }

  newBoard(e) {
    e.preventDefault();
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
      <div>
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
              max="20"
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
              max="20"
              placeholder="height"
              value={this.state.height}
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
        <hr />
      </div>
    );
  }
}

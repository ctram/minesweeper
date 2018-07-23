import React, { Component } from 'react';
import BoardSettings from './board-settings';
import Board from './board';
import MinesweeperGame from '../lib/minesweeper';

export default class Minesweeper extends Component {
  constructor(props) {
    super(props);
    this.game = new MinesweeperGame();
  }

  updateBoard() {}

  render() {
    return (
      <div>
        <BoardSettings game={this.game} handleUpdateBoard={this.updateBoard} />
        <div className="grid-container">
          <div className="grid-x align-center">
            <Board board={this.game.board} />
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import BoardSettings from './board-settings';
import Board from './board';
import MinesweeperGame from '../lib/minesweeper';

export default class Minesweeper extends Component {
  constructor(props) {
    super(props);
    this.state = { game: new MinesweeperGame() };
    this.newBoard = this.newBoard.bind(this);
  }

  newBoard(x, y) {
    this.setState({ game: new MinesweeperGame(x, y) });
  }

  render() {
    const { game } = this.state;

    return (
      <div className="d-flex flex-column align-items-center pt-3">
        <BoardSettings game={game} handleNewBoard={this.newBoard} />
        <Board board={game.board} />
      </div>
    );
  }
}

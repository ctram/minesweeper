import React, { Component } from 'react';
import BoardSettings from './board-settings';
import Board from './board';
import MinesweeperGame from '../lib/minesweeper';
import toastr from 'toastr';

export default class Minesweeper extends Component {
  constructor(props) {
    super(props);
    this.state = { game: new MinesweeperGame() };
    this.newBoard = this.newBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  newBoard(x, y) {
    try {
      this.setState({ game: new MinesweeperGame(x, y) });
    } catch (e) {
      toastr.error(e);
    }
  }

  handleClick(square) {
    const { game } = this.state;
    this.setState({ game: game.clickSquare(square) });
  }

  render() {
    const { game } = this.state;

    return (
      <div className="d-flex flex-column align-items-center pt-3">
        <BoardSettings game={game} handleNewBoard={this.newBoard} />
        <Board board={game.board} handleClick={this.handleClick} />
      </div>
    );
  }
}

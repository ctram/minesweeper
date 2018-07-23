import React, { Component } from 'react';
import BoardSettings from './board-settings';
import Board from './board';
import MinesweeperGame from '../lib/minesweeper';
import toastr from 'toastr';

export default class Minesweeper extends Component {
  constructor(props) {
    super(props);
    this.newBoard = this.newBoard.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.state = { game: new MinesweeperGame(), flagMode: false };
  }

  newBoard(x, y, numMines) {
    try {
      this.setState({ game: new MinesweeperGame(x, y, numMines) });
      toastr.success(`Board created with ${numMines} mines`);
    } catch (e) {
      toastr.error(e);
    }
  }

  onClick(square) {
    this.setState({ game: this.state.game.clickSquare(square) });
    this.checkGameState();
  }

  onContextMenu(square) {
    this.setState({ game: this.state.game.toggleFlagSquare(square) });
    this.checkGameState();
  }

  checkGameState() {
    const { game } = this.state;

    if (game.state === 'won') {
      toastr.success("You've Won!");
    } else if (game.state === 'lost') {
      toastr.error('You lost');
    }
  }

  render() {
    const { game, flagMode } = this.state;

    return (
      <div className="d-flex flex-column align-items-center pt-3">
        <BoardSettings game={game} handleNewBoard={this.newBoard} />
        <hr />
        <Board game={game} onClick={this.onClick} onContextMenu={this.onContextMenu} />
      </div>
    );
  }
}

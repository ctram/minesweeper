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
    this.state = { game: new MinesweeperGame() };
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
    const { game } = this.state;

    return (
      <div className="d-flex flex-column align-items-center my-5">
        <BoardSettings game={game} handleNewBoard={this.newBoard} />
        <hr />
        <div className="alert alert-primary">
          <strong>Note:</strong> Not designed for small screens.
        </div>
        <p className="instructions">
          <ol>
            <li>Click on square to reveal what is underneath.</li>
            <li>If you reveal a mine, you lose.</li>
            <li>
              A number indicates how many mines are adjacent to the square. No number indicates
              there are zero mines adjacent to the square.
            </li>
            <li>
              <strong>Right click</strong> to flag the square as a mine.
            </li>
            <li>
              You win by revealing all squares that are not mines <strong>and</strong> flagging all
              squares that are mines.
            </li>
          </ol>
        </p>
        <Board game={game} onClick={this.onClick} onContextMenu={this.onContextMenu} />
      </div>
    );
  }
}

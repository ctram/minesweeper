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
    const { game } = this.state;
    const _game = game.clickSquare(square);

    if (_game.state === 'won') {
      toastr.success("You've Won!");
    } else if (_game.state === 'lost') {
      toastr.error('You lost');
    }
    this.setState({ game: _game });
  }

  onContextMenu(square) {
    const { game } = this.state;
    const _game = game.toggleFlagSquare(square);
    this.setState({ game: _game });
  }

  render() {
    const { game, flagMode } = this.state;

    return (
      <div className="d-flex flex-column align-items-center pt-3">
        <BoardSettings game={game} handleNewBoard={this.newBoard} />
        <hr />
        <div className="d-flex flex-column align-items-center">
          <div className="mb-3">
            <button type="button" className={'btn btn-danger mr-3 ' + (flagMode ? 'd-none' : '')}>
              Flag Mode
            </button>
            <button type="button" className={'btn btn-info ' + (flagMode ? '' : 'd-none')}>
              Reveal Mode
            </button>
          </div>
          <Board game={game} onClick={this.onClick} onContextMenu={this.onContextMenu} />
        </div>
      </div>
    );
  }
}

import Board from './board';

export default class Minesweeper {
  static createBoard(height, width, numMines) {
    return new Board(height, width, numMines);
  }

  constructor(height = 3, width = 3, numMines = 1) {
    this._board = Minesweeper.createBoard(height, width, numMines);
    this._state = 'playing';
  }

  get board() {
    return this._board;
  }

  get state() {
    return this._state;
  }

  hasWon() {
    return this._board.allSquares().every(square => {
      if (square.isMine) {
        return !square.isExposed;
      }

      return square.isExposed;
    });
  }

  revealMines() {
    this._board.revealMines();
  }

  clickSquare(square) {
    const nextStateOfSquare = square.click();

    if (square.isMine) {
      this._state = 'lost';
      return this;
    }
    if (nextStateOfSquare === 'B') {
      square.revealNeighbors();
    }
    if (this.hasWon()) {
      this._state = 'won';
      this.revealMines();
    }
    return this;
  }
}

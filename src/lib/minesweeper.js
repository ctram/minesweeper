import Board from './board';

export default class Minesweeper {
  static createBoard(height, width, numMines) {
    this._board = new Board(height, width, numMines);
    return this._board;
  }

  constructor(height, width) {
    // Defaults
    if (!height || !width) {
      height = 3;
      width = 3;
    }
    this._board = Minesweeper.createBoard(height, width);
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

  clickSquare(square) {
    const nextStateOfSquare = square.click();

    if (square.isMine) {
      this._state = 'lost';
      return this;
    }

    if (this.hasWon()) {
      this._state = 'won';
      return this;
    }

    if (nextStateOfSquare === 'B') {
      square.revealNeighbors();
    }
    return this;
  }
}

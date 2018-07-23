import Board from './board';

export default class Minesweeper {
  static createBoard(height, width, numMines) {
    return new Board(height, width, numMines);
  }

  constructor(height = 5, width = 5, numMines = 3) {
    this._board = Minesweeper.createBoard(height, width, numMines);
    this._state = 'playing';
    this._clickHistory = [];
    this._attrs = { height, width, numMines };
  }

  get attrs() {
    return this._attrs;
  }

  get board() {
    return this._board;
  }

  get state() {
    return this._state;
  }

  get lastClicked() {
    return this._clickHistory[this._clickHistory.length - 1];
  }

  hasWon() {
    return this._board.allSquares().every(square => {
      if (square.isMine) {
        return !square.revealed;
      }

      return square.revealed;
    });
  }

  revealMines() {
    this._board.revealMines();
  }

  clickSquare(square) {
    const nextStateOfSquare = square.click();
    this._clickHistory.push(square);

    if (square.isMine) {
      this._state = 'lost';
      this.revealRemainingSquares();
    }
    if (nextStateOfSquare === 'B') {
      square.revealNeighbors();
    }
    if (this.hasWon()) {
      this._state = 'won';
      this.revealRemainingSquares();
    }
    return this;
  }

  revealRemainingSquares() {
    this._board.allSquares().forEach(square => {
      if (this._clickHistory.indexOf(square) === -1) {
        square.reveal();
      }
    });
  }
}

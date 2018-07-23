import Board from './board';

export default class Minesweeper {
  static createBoard(height, width, numMines) {
    return new Board(height, width, numMines);
  }

  constructor(height = 25, width = 25, numMines = 50) {
    this._board = Minesweeper.createBoard(height, width, numMines);
    this._state = 'playing';
    this._clickHistory = [];
    this._attrs = { height, width, numMines };
    this._numMines = numMines;
    this._numSquares = height * width;
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

  updateGameState() {
    let lost;
    let numFlaggedMines = 0;
    let numNonMinesRevealed = 0;

    this._board.allSquares().some(square => {
      if (square.isMine) {
        if (square.revealed) {
          lost = true;
          return true;
        } else if (square.flagged) {
          numFlaggedMines += 1;
        }
      } else {
        numNonMinesRevealed += square.revealed ? 1 : 0;
      }
    });

    if (lost) {
      this._state = 'lost';
    } else if (
      numFlaggedMines === this._numMines &&
      numNonMinesRevealed === this._numSquares - this._numMines
    ) {
      this._state = 'won';
    }
    return this._state;
  }

  clickSquare(square) {
    const nextStateOfSquare = square.click();
    this._clickHistory.push(square);

    if (nextStateOfSquare === 'B') {
      square.revealNeighbors();
    }
    this.checkEndGame();
    return this;
  }

  toggleFlagSquare(square) {
    square.toggleFlag();
    this.checkEndGame();
    return this;
  }

  checkEndGame() {
    if (this.updateGameState() !== 'playing') {
      this.revealRemainingSquares();
    }
  }

  revealRemainingSquares() {
    this._board.allSquares().forEach(square => {
      if (this._clickHistory.indexOf(square) === -1) {
        square.reveal();
      }
    });
  }
}

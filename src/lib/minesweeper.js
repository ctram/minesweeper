import Board from './board';

export default class Minesweeper {
  constructor(height, width) {
    // Defaults
    if (!height || !width) {
      height = 3;
      width = 3;
    }
    this._board = Minesweeper.createBoard(height, width);
  }

  static createBoard(height, width) {
    const board = new Board(height, width);
    // Random mine
    const x = Math.ceil(Math.random() * (height - 1));
    const y = Math.ceil(Math.random() * (width - 1));
    board.setSquare(x, y, 'M');

    return board;
  }

  get board() {
    return this._board;
  }

  clickSquare(square) {
    const nextStateOfSquare = square.click();

    if (nextStateOfSquare === 'B') {
      square.updateNeighbors();
    }
    return this;
  }
}

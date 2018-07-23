import Board from './board';

export default class Minesweeper {
  constructor(height, width) {
    
    // Defaults
    if (!height || !width) {
      height = 3;
      width = 3;
    }
    
    this.DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
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

  /**
   * @param {character[][]} board
   * @param {number[]} click
   * @return {character[][]}
   */
  updateBoard(board, squareClicked) {
    const nextStateOfSquare = squareClicked.click();

    if (nextStateOfSquare === 'B') {
      squareClicked.updateNeighbors();
      return board;
    }
    return board;
  }
}

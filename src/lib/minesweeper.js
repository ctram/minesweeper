class Square {
  constructor(val, coordinates, board, isExposed = false) {
    this._val = val === 'E' ? null : val;
    this._coordinates = coordinates;
    this._isExposed = isExposed;
    this._board = board;
    this._isMine = val === 'M';
  }

  get val() {
    return this._val;
  }

  set val(val) {
    this._val = val;
  }

  get isExposed() {
    return this._isExposed;
  }

  set isExposed(isExposed) {
    this._isExposed = isExposed;
  }

  get coorX() {
    return this._coordinates[0];
  }

  get coorY() {
    return this._coordinates[1];
  }

  get id() {
    return this._coordinates.join(',');
  }

  get isMine() {
    return this._isMine;
  }

  isNearMine() {
    const nextState = this.nextStateOfSquareIfClicked();
    return nextState !== 'M' && nextState !== 'B';
  }

  nextStateOfSquareIfClicked() {
    if (square.val === 'M') {
      return 'X';
    }

    const numMines = this.neighbors().reduce((acc, neighbor) => {
      if (neighbor.val === 'M') {
        return ++acc;
      }
      return acc;
    }, 0);

    if (numMines === 0) {
      return 'B';
    }
    return String(numMines);
  }

  click() {
    this._isExposed = true;
    return (this._val = this.nextStateOfSquareIfClicked());
  }

  neighbors() {
    return this.DELTAS.map(delta => {
      const i = this.coorX + delta[0];
      const j = this.coorY + delta[1];

      if (
        i < 0 ||
        i >= this._board.length ||
        j < 0 ||
        j >= this._board[0].length ||
        neighbor.isExposed
      ) {
        return null;
      }

      return this._board[i][j];
    }).filter(neighbor => {
      return neighbor;
    });
  }

  updateNeighbors() {
    const neighbors = this.neighbors();
    let i = 0;

    while (i < neighbors.length) {
      const neighbor = neighbors[i];

      if (neighbor.isMine) {
        null;
      } else if (neighbor.isNearMine()) {
        neighbor.click();
      } else {
        neighbor.click();
        neighbor.updateNeighbors();
      }
      i++;
    }
  }
}

export default class Minesweeper {
  constructor() {
    this.DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const defaultDimensions = [3, 3];
    this._board = Minesweeper.createBoard(defaultDimensions);
  }

  static createBoard(dimensions) {
    const board = [];
    // Random mine
    const x = Math.ceil(Math.random() * (dimensions[0] - 1));
    const y = Math.ceil(Math.random() * (dimensions[1] - 1));

    for (let i = 0; i < dimensions[0]; ++i) {
      const row = [];
      for (let j = 0; j < dimensions[1]; ++j) {
        if (i === x && y === j) {
          row.push(new Square('M', [i, j]));
        } else {
          row.push(new Square('E', [i, j]));
        }
      }
      board.push(row);
    }
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

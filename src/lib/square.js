export default class Square {
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
    this._isMine = val === 'M';
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
    if (this._val === 'M') {
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
      const square = this._board.getSquare(i, j);

      if (
        i < 0 ||
        i >= this._board.length ||
        j < 0 ||
        j >= this._board[0].length ||
        square.isExposed
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

export default class Square {
  constructor(val, board, coordinates) {
    this._val = val === 'E' ? null : val;
    this._coordinates = coordinates;
    this._revealed = false;
    this._board = board;
    this._isMine = val === 'M';
    this.DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  }

  get val() {
    return this._val;
  }

  set val(val) {
    this._isMine = val === 'M';
    this._val = val;
  }

  get revealed() {
    return this._revealed;
  }

  set revealed(revealed) {
    this._revealed = revealed;
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

  reveal() {
    this._revealed = true;
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
    this._revealed = true;
    return (this._val = this.nextStateOfSquareIfClicked());
  }

  neighbors() {
    const _this = this;
    return _this.DELTAS.map(delta => {
      const i = _this.coorX + delta[0];
      const j = _this.coorY + delta[1];
      const square = _this._board.getSquare(i, j);

      if (!square || square.revealed) {
        return null;
      }
      return square;
    }).filter(neighbor => {
      return neighbor;
    });
  }

  revealNeighbors() {
    const neighbors = this.neighbors();
    let i = 0;

    while (i < neighbors.length) {
      const neighbor = neighbors[i];

      if (neighbor.isNearMine()) {
        neighbor.click();
      } else if (!neighbor.isMine) {
        neighbor.click();
        neighbor.revealNeighbors();
      }
      i++;
    }
  }
}

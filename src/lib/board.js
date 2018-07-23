import Square from './square';

export default class Board {
  constructor(x, y) {
    const LIMIT = 30;

    if (x > LIMIT || y > LIMIT) {
      throw `Dimension cannot exceed ${LIMIT}`;
    }
    this._matrix = [];
    for (let i = 0; i < x; ++i) {
      const row = [];
      for (let j = 0; j < y; ++j) {
        row.push(new Square(null, this, [i, j]));
      }
      this._matrix.push(row);
    }
  }

  get matrix() {
    return this._matrix;
  }

  get height() {
    return this._matrix.length;
  }

  get width() {
    return this._matrix[0].length;
  }

  getSquare(x, y) {
    if (x === undefined || y === undefined || x < 0 || x >= this._matrix.length || y < 0 || y >= this._matrix[0].length) {
      return null;
    }

    return this._matrix[x][y];
  }

  setSquare(x, y, val) {
    this._matrix[x][y].val = val;
  }

  allSquares() {
    const squares = [];
    this._matrix.forEach(row => {
      row.forEach(square => squares.push(square));
    });
    return squares;
  }
}

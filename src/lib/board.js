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
        row.push(new Square(null, this._matrix, [i, j]));
      }
      this._matrix.push(row);
    }
  }

  get matrix() {
    return this._matrix;
  }

  getSquare(x, y) {
    return this._matrix[x][y];
  }

  setSquare(x, y, val) {
    this._matrix[x][y].val = val;
  }
}

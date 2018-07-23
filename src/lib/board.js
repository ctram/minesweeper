import Square from './square';

export default class Board {
  constructor(height, width, numMines) {
    const LIMIT = 30;

    if (numMines > height * width - 1) {
      throw new Error('Must have at least one empty square');
    }
    if (height > LIMIT || width > LIMIT) {
      throw new Error(`Dimension cannot exceed ${LIMIT}`);
    }
    if (numMines <= 0) {
      throw new Error(`Must have at least one mine`);
    }

    this._matrix = [];
    this._mineLocations = {};
    let x = 0;

    while (x < numMines) {
      const i = Math.floor(Math.random() * height);
      const j = Math.floor(Math.random() * width);
      if (this._mineLocations[`${i},${j}`]) {
        continue;
      }

      this._mineLocations[`${i},${j}`] = [i, j];
      x++;
    }

    for (let i = 0; i < height; ++i) {
      const row = [];
      for (let j = 0; j < width; ++j) {
        const isMine = this._mineLocations[`${i},${j}`];
        row.push(new Square(isMine ? 'M' : null, this, [i, j]));
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
    if (
      x === undefined ||
      y === undefined ||
      x < 0 ||
      x >= this._matrix.length ||
      y < 0 ||
      y >= this._matrix[0].length
    ) {
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

export default class Minesweeper {
  constructor() {
    this.DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const defaultDimensions = [3, 3];
    this._board = Minesweeper.createBoard(defaultDimensions);
  }

  static createBoard(dimensions) {
    const board = new Array(dimensions[0]).map(() => {
      return new Array(dimensions[1]);
    });
    // Random mine
    const x = Math.ceil(Math.random() * dimensions[0]);
    const y = Math.ceil(Math.random() * dimensions[1]);

    return board.map((row, i) => {
      row.map((_square, j) => {
        if (i === x && y === j) {
          return 'M';
        }
        return 'E';
      });
    });
  }

  get board() {
    return this._board; 
  }

  /**
   * @param {character[][]} board
   * @param {number[]} click
   * @return {character[][]}
   */
  updateBoard(board, click) {
    const _nextStateOfSquare = nextStateOfSquare(board, click);
    board = setStateOfSquare(board, click, _nextStateOfSquare);

    if (_nextStateOfSquare === 'B') {
      const neighbors = getNeighbors(board, click);
      const squaresAlreadyProcessed = updateSquaresAlreadyProcessed(click);

      return updateNeighbors({ board, neighbors, squaresAlreadyProcessed });
    }
    return board;
  }

  updateNeighbors({ board, neighbors, squaresAlreadyProcessed }) {
    neighbors = neighbors.filter(neighbor => {
      return !squaresAlreadyProcessed[neighbor.join(',')];
    });
    let i = 0;

    while (i < neighbors.length) {
      const neighbor = neighbors[i];
      const nextStateOfNeighbor = nextStateOfSquare(board, neighbor);
      board = setStateOfSquare(board, neighbor, nextStateOfNeighbor);
      squaresAlreadyProcessed = updateSquaresAlreadyProcessed(neighbor, squaresAlreadyProcessed);
      let _neighbors = [];
      if (nextStateOfNeighbor === 'B') {
        _neighbors = getNeighbors(board, neighbor, squaresAlreadyProcessed);
      }
      neighbors = neighbors.concat(_neighbors);
      i++;
    }
    return board;
  }

  updateSquaresAlreadyProcessed(squares, squareAlreadyProcessed = {}) {
    if (squares[0].__proto__ !== Array.prototype) {
      squares = [squares];
    }

    squares.forEach(square => {
      squareAlreadyProcessed[square.join(',')] = true;
    });
    return squareAlreadyProcessed;
  }

  setStateOfSquare(board, square, state) {
    board[square[0]][square[1]] = state;
    return board;
  }

  nextStateOfSquare(board, square) {
    if (stateOfSquare(board, square) === 'M') {
      return 'X';
    }

    const neighbors = getNeighbors(board, square);
    const numMines = neighbors.reduce((acc, neighbor) => {
      if (stateOfSquare(board, neighbor) === 'M') {
        return ++acc;
      }
      return acc;
    }, 0);

    if (numMines === 0) {
      return 'B';
    }
    return String(numMines);
  }

  stateOfSquare(board, square) {
    return board[square[0]][square[1]];
  }

  getNeighbors(board, square, squareAlreadyProcessed = {}) {
    return this.DELTAS.map(delta => {
      const i = square[0] + delta[0];
      const j = square[1] + delta[1];

      if (
        i >= 0 &&
        i < board.length &&
        j >= 0 &&
        j < board[0].length &&
        !squareAlreadyProcessed[`${i},${j}`]
      ) {
        return [i, j];
      }
      return null;
    }).filter(neighbor => {
      return neighbor;
    });
  }
}

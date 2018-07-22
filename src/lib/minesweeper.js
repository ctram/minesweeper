const DELTAS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
  const _nextStateOfSquare = nextStateOfSquare(board, click);
  board = setStateOfSquare(board, click, _nextStateOfSquare);

  if (_nextStateOfSquare === 'B') {
    const neighbors = getNeighbors(board, click);
    const squaresAlreadyProcessed = updateSquaresAlreadyProcessed(click);

    return updateNeighbors({ board, neighbors, squaresAlreadyProcessed });
  }
  return board;
};

function updateNeighbors({ board, neighbors, squaresAlreadyProcessed }) {
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

function updateSquaresAlreadyProcessed(squares, squareAlreadyProcessed = {}) {
  if (squares[0].__proto__ !== Array.prototype) {
    squares = [squares];
  }

  squares.forEach(square => {
    squareAlreadyProcessed[square.join(',')] = true;
  });
  return squareAlreadyProcessed;
}

function setStateOfSquare(board, square, state) {
  board[square[0]][square[1]] = state;
  return board;
}

function nextStateOfSquare(board, square) {
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

function stateOfSquare(board, square) {
  return board[square[0]][square[1]];
}

function getNeighbors(board, square, squareAlreadyProcessed = {}) {
  return DELTAS.map(delta => {
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

const board = [
  ['E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'M', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E']
];
const click = [3, 0];

const result = updateBoard(board, click);

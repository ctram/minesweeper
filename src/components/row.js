import React, { Component } from 'react';
import Square from './square';

class Row extends Component {
  render() {
    const { squares, onClick, onContextMenu, game } = this.props;

    return (
      <div className="board-row row">
        {squares.map((square, idx) => {
          return (
            <Square
              square={square}
              key={idx}
              onClick={onClick}
              onContextMenu={onContextMenu}
              game={game}
            />
          );
        })}
      </div>
    );
  }
}

export default Row;

import React, { Component } from 'react';
import Square from './square';

class Row extends Component {
  render() {
    const { squares, handleClick, game } = this.props;

    return (
      <div className="board-row row">
        {squares.map((square, idx) => {
          return <Square square={square} key={idx} handleClick={handleClick} game={game} />;
        })}
      </div>
    );
  }
}

export default Row;

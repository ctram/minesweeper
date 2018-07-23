import React, { Component } from 'react';
import Square from './square';

class Row extends Component {
  render() {
    const { squares } = this.props;

    return (
      <div className="board-row">
        {squares.map(square => {
          return <Square square={square} />;
        })}
      </div>
    );
  }
}

export default Row;

import React, { Component } from 'react';
import Square from './square';

class Row extends Component {
  render() {
    const { squares } = this.props;

    return squares.map(square => {
      <Square square={square} />;
    });
  }
}

export default Row;

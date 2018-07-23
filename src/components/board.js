import React, { Component } from 'react';
import Row from './row';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      board: { matrix }
    } = this.props;

    return matrix.map(row => {
      return <Row squares={row} />;
    });
  }
}

export default Board;

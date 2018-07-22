import React, { Component } from 'react';
import Row from './row';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { board } = this.props;

    return board.map(row => {
      return <Row squares={row} />;
    });
  }
}

export default Board;

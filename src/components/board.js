import React, { Component } from 'react';
import Row from './row';

class Board extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { rows } = this.props;

    return rows.map(row => {
      <Row row={row} />;
    });
  }
}

export default Board;

import React, { Component } from 'react';
import Row from './row';

export default class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      board: { matrix }
    } = this.props;

    return matrix.map((row, idx) => {
      return <Row squares={row} key={idx} />;
    });
  }
}

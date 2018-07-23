import React, { Component } from 'react';
import Row from './row';

export default class Board extends Component {
  render() {
    const { game, onClick, onContextMenu } = this.props;

    return game.board.matrix.map((row, idx) => {
      return (
        <Row squares={row} key={idx} onClick={onClick} onContextMenu={onContextMenu} game={game} />
      );
    });
  }
}

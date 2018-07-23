import React, { Component } from 'react';

export default class Square extends Component {
  render() {
    const { square, onClick, onContextMenu, game } = this.props;
    let content;
    let style = 'square text-center';
    const disabled = game.state !== 'playing';

    if (square.revealed) {
      style += ' square--revealed';

      if (square.isMine) {
        style += square === game.lastClicked ? ' square--explosion' : '';
        content = 'M';
      } else if (square.val === 'B') {
        content = '';
      } else {
        content = square.val;
      }
    } else if (square.flagged) {
      content = 'F';
    }

    if (disabled) {
      style += ' square--disabled';
    }
    return (
      <div
        onContextMenu={e => {
          e.preventDefault();
          !square.revealed && onContextMenu(square);
        }}
        className={style}
        onClick={() => {
          !disabled && onClick(square);
        }}
      >
        {content}
      </div>
    );
  }
}

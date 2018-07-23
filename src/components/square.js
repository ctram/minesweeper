import React, { Component } from 'react';

export default class Square extends Component {
  render() {
    const { square, handleClick, game } = this.props;
    let content;
    let style = 'square text-center';
    const disabled = game.state !== 'playing';

    if (square.revealed) {
      style += ' square--revealed';

      if (square.isMine) {
        debugger
        style += square === game.lastClicked ? ' square--explosion' : '';
        content = 'M';
      } else if (square.val === 'B') {
        content = '';
      } else {
        content = square.val;
      }
    }
    if (disabled) {
      style += ' square--disabled';
    }

    return (
      <div
        className={style}
        onClick={() => {
          !disabled && handleClick(square);
        }}
      >
        {content}
      </div>
    );
  }
}

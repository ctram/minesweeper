import React, { Component } from 'react';

export default class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { square, handleClick, disabled } = this.props;
    let content = square.isExposed ? square.val : '';
    let style = 'square';

    if (square.isExposed) {
      style += ' square--exposed';
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

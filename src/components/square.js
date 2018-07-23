import React, { Component } from 'react';

export default class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { square, handleClick } = this.props;
    let content = square.isExposed ? square.val : '';
    let style = 'square';

    if (square.isExposed) {
      style += ' square--exposed';
    }

    return (
      <div
        className={style}
        onClick={() => {
          handleClick(square);
        }}
      >
        {content}
      </div>
    );
  }
}

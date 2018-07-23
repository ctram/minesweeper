import React, { Component } from 'react';

export default class Square extends Component {
  render() {
    const { square } = this.props;
    let content = '';
    let style = 'square';

    if (square.isExposed) {
      style += ' square--exposed';
    }

    return <div className={style}>{content}</div>;
  }
}

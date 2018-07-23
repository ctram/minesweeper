import React, { Component } from 'react';

class Square extends Component {
  render() {
    const { square } = this.props;
    let content = '';
    let style = '';

    if (square.isExposed) {
      style = 'square--exposed';
    }

    return <div className={`square ${style}`}>{content}</div>;
  }
}

export default Square;

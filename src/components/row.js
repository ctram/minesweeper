import React, { Component } from 'react';
import Square from './square';

class Row extends Component {
  render() {
    const { squares } = this.props;

    return (
      <div className="grid-x grid-margin-x align-center">
        {squares.map(square => {
          return <Square square={square} />;
        })}
      </div>
    );
  }
}

export default Row;

import React, { Component } from 'react';

export default class TopBar extends Component {
  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <li className="menu-text">Minesweeper</li>
          </ul>
        </div>
      </div>
    );
  }
}

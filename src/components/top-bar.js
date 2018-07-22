import React, { Component } from 'react';

export default class TopBar extends Component {
  render() {
    return (
      <div class="top-bar">
        <div class="top-bar-left">
          <ul class="dropdown menu" data-dropdown-menu>
            <li class="menu-text">Minesweeper</li>
          </ul>
        </div>
      </div>
    );
  }
}

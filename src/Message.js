import React, {Component} from 'react'
import './Message.css'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends Component  {

  render() {
    return (
      <React.Fragment>
        <div className='header'>
          <h1>Tic Tac Toe</h1>
          <button onClick={() => this.props.restart()}>New Game</button>
        </div>
      </React.Fragment>
    )
  }
}

export default Header

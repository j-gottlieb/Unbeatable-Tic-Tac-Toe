import React, {Component} from 'react'
import './Header.css'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends Component  {

  colorPicker (state) {
    if (state === 'Its a tie!') {
      return 'purple'
    } else if (state === 'You lose!') {
      return 'red'
    } else if (state === 'You win!') {
      return 'blue'
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className='header'>
          <h1>Tic Tac Toe</h1>
          <div className='message' style={{color: this.colorPicker(this.props.message)}}>
            <p>{this.props.message}</p>
          </div>
          <button onClick={() => this.props.restart()}>New Game</button>
        </div>
      </React.Fragment>
    )
  }
}

export default Header

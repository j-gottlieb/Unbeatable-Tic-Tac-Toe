import React, {Component} from 'react'
import './Header.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
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
    const difficultyOptions = ['easy', 'medium', 'hard']
    const defaultOption = this.props.currentDifficulty
    return (
      <React.Fragment>
        <div className='header'>
          <h1>Unbeatable Tic Tac Toe</h1>
          <div className='message' style={{color: this.colorPicker(this.props.message)}}>
            <p>{this.props.message}</p>
          </div>
          <button onClick={() => this.props.restart()}>New Game</button>
          <div className={'difficulty'}>
            <div className={'difficulty-label'}>
              <p>Choose Difficulty: </p>
            </div>
            <Dropdown
              className={'difficulty-dropdown'}
              options={difficultyOptions}
              onChange={(val) => this.props.chooseDifficulty(val)}
              value={defaultOption}
              placeholder="Select Difficulty" />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Header

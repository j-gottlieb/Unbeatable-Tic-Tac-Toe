import React, { Component } from 'react';
import './App.css';
import Square from './Game.js'

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

class App extends Component {
  constructor () {
    super()

    this.state = {
      currentMove: 'x',
      moves: {},
      message: '',
      gameOver: false
    }
  }

  checkWin () {

    const {moves} = this.state
    const x = []
    const o = []
    const size = Object.keys(moves).length
    for (const position in moves) {
      if (moves[`${position}`] === 'x') {
        x.push(parseInt(position))
      } else {
        o.push(parseInt(position))
      }
    }
    winConditions.forEach(arr => {
    if (arr.every(elem => x.indexOf(elem) > -1)) {
      this.setState({
        message: 'x win!',
        gameOver: true
      })
    } else if (arr.every(elem => o.indexOf(elem) > -1)) {
      this.setState({
        message: 'o win!',
        gameOver: true
      })
    } else if (size === 9) {
      this.setState({
        message: 'Its a tie!',
        gameOver: true
      })
    }
  })

  }

handleClick (position) {
  if (!this.state.gameOver) {
    if (!this.state.moves[`${position}`]) {
      this.setState({ moves: {...this.state.moves, [`${position}`]: this.state.currentMove } }, function () {
      this.checkWin()})
      if (this.state.currentMove === 'x') {
        this.setState({
          currentMove: 'o'
        })
      } else {
        this.setState({
          currentMove: 'x'
        })
      }
    }
  }
}


restart () {
  this.setState({
    currentMove: 'x',
    moves: {},
    message: '',
    gameOver: false
  })
}

  render() {
    // console.log(this.state.moves)
    const squares = []
    for (var i = 0; i < 9; i++) {
      squares.push(<Square
        player={this.state.moves[`${i}`]}
        handleClick={(i) => this.handleClick(i)}
        key={i}
        position={i}
        />)
    }
    return (
      <React.Fragment>
      <main>
        <h1>Tic Tac Toe</h1>
        <button onClick={() => this.restart()}>Start Over</button>
        <div className='gameboard'>
          {squares}
        </div>
        <p>{this.state.message}</p>
      </main>
    </React.Fragment>
    )
  }
}

export default App;

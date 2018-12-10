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
      moves: {}
    }
  }

  checkWin = () => {
    console.log(this.state.moves)
  }

handleClick (position) {
  if (!this.state.moves[`${position}`]) {
    const newProp = {...this.state.moves}
    newProp[`${position}`] = this.state.currentMove;
    this.setState({newProp})
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
  this.checkWin()
}

  render() {
    const squares = []
    for (var i = 0; i < 9; i++) {
      squares.push(<Square handleClick={(event) => this.handleClick(event)} key={i} position={i} />)
    }
    return (
      <React.Fragment>
      <main>
      <h1>Tic Tac Toe</h1>
      <div className='gameboard'>
        {squares}
      </div>
      </main>
    </React.Fragment>
    )
  }
}

export default App;

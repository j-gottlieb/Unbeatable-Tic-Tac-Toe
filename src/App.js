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

    this.ai = 'o'
    this.human = 'x'

    this.state = {
      currentMove: this.human,
      message: '',
      gameOver: false,
      moves: [0,1,2,3,4,5,6,7,8]
    }
  }

  checkWin (board, player) {
    const playerMoves = []
    let result = false
    // populate arrays with all of the current moves for each player
    for (let i = 0; i < board.length; i++) {
      if (board[i] === player) {
        playerMoves.push(i)
      }
    }
    // Check for victory of player
    winConditions.forEach(arr => {
    if (arr.every(elem => playerMoves.indexOf(elem) > -1)) {
      result = true
    }
  })
  return result
  }

  gameOver () {
    const moves = this.state.moves
    const x = []
    const o = []
    // tieValue is just the number of moves that have been made so far.
    const tieValue = function () {
      let val = 0
      moves.forEach(move => {
        if (typeof move !== 'number') {
          val++
        }
      })
      return val
    }
    // populate arrays with all of the current moves for each player
    for (let i = 0; i < moves.length; i++) {
      if (moves[i] === this.human) {
        x.push(i)
      } else if (moves[i] === this.ai) {
        o.push(i)
      }
    }
    // Check for victory
    winConditions.forEach(arr => {
      // check for defeat
    if (arr.every(elem => x.indexOf(elem) > -1)) {
      this.setState({
        message: 'You win!',
        gameOver: true
      })
    } else if (arr.every(elem => o.indexOf(elem) > -1)) {
      this.setState({
        message: 'You lose!',
        gameOver: true
      })
      // check for tie
    } else if (tieValue() === 9) {
      this.setState({
        message: 'Its a tie!',
        gameOver: true
      })
    }
  })
  }

handleClick (position) {
  if (!this.state.gameOver) {
    if (typeof this.state.moves[position] === 'number') {
      const arr = this.state.moves
      arr[position] = this.human
      this.setState({moves: arr})
    } else {
      this.setState({ message: 'Someone already went there!'})
    }
    this.gameOver()
    this.aiTurn(this.bestSpot())
    this.gameOver()
  }
}

emptySquares () {
  const moves = this.state.moves.slice(0)
  return moves.filter(a => typeof a === 'number')
}

bestSpot () {
  const moves = this.state.moves.slice(0)
  return this.minimax(moves, this.ai).index
}

aiTurn (bestSpot) {
  const arr = this.state.moves
  arr[bestSpot] = this.ai
  this.setState({moves: arr})
}

minimax (newBoard, player) {
  // get available spots
	const availSpots = newBoard.filter(a => typeof a === 'number')
  // if human player wins this round return -10
	if (this.checkWin(newBoard, this.human)) {
		return {score: -10};
	} else if (this.checkWin(newBoard, this.ai)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
  // save all hypothetical moves
	const moves = [];
  // loop through available spots
	for (let i = 0; i < availSpots.length; i++) {
    // save current move enumeration
		const move = {};
    // save index of current move
		move.index = newBoard[availSpots[i]];
    // apply the current player's letter to that index
		newBoard[availSpots[i]] = player;
    // if human player, recursively call this function with ai player
		if (player === this.human) {
			const result = this.minimax(newBoard, this.ai);
      // give this move a score
			move.score = result.score;
		} else {
      // if ai player, recursively call this function with human player
			const result = this.minimax(newBoard, this.human);
			move.score = result.score;
		}
    // remove the player letter applied to the current index of this enumeration
		newBoard[availSpots[i]] = move.index;
    // push the current move to the moves array
		moves.push(move);
	}

	let bestMove
  // find which move received the best score
	if(player === this.ai) {
		let bestScore = -10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

restart () {
  this.setState({
    currentMove: this.human,
    moves: [0,1,2,3,4,5,6,7,8],
    message: '',
    gameOver: false
  })
}

  render() {
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

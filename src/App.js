import React, { Component } from 'react';
import './App.css';
import Square from './Game.js'
import Header from './Header.js'
import Message from './Message.js'

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
// Check for a game outcome within the context of the minimax function
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
// Check for outcome in the context of the actual game.
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
    // use hard-coded winConditions array to check outcome
    winConditions.forEach(arr => {
      // Check for victory
    if (arr.every(elem => x.indexOf(elem) > -1)) {
      this.setState({
        message: 'You win!',
        gameOver: true
      })
      // check for defeat
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
// Handle a click inside the game board.
handleClick (position) {
  // Allow a move if the space isn't occupied and the game isn't over
  if (!this.state.gameOver) {
    if (typeof this.state.moves[position] === 'number') {
      const arr = this.state.moves
      arr[position] = this.human
      this.gameOver()
      this.aiTurn(this.bestSpot())
      this.gameOver()
      this.setState({moves: arr})
    } else {
      this.setState({ message: 'Someone already went there!'})
    }
  }
}
// Call minimax function using the current board state
bestSpot () {
  const moves = this.state.moves.slice(0)
  return this.minimax(moves, this.ai).index
}
// set the state to reflect the new ai move
aiTurn (bestSpot) {
  const arr = this.state.moves
  arr[bestSpot] = this.ai
  this.setState({moves: arr})
}
// recursive function to find the best possible AI move given the current state of the board.
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
// reset the board to start a new game
restart = () => {
  this.setState({
    currentMove: this.human,
    moves: [0,1,2,3,4,5,6,7,8],
    message: '',
    gameOver: false
  })
}

  render() {
    const squares = []
    // create a gameboard
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
        <Header message={this.state.message} restart={this.restart}/>
        <div className='container'>
          <div className='gameboard'>
            {squares}
          </div>
          <Message />
        </div>
      </main>
      </React.Fragment>
    )
  }
}

export default App;

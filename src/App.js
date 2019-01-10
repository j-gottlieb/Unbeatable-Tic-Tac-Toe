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
      moves: [0,1,2,3,4,5,6,7,8],
      difficulty: 'easy'
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
    // populate arrays with all of the current moves for each player
    for (let i = 0; i < moves.length; i++) {
      if (moves[i] === this.human) {
        x.push(i)
      } else if (moves[i] === this.ai) {
        o.push(i)
      }
    }
    // analyze tie state.
    const tieValue = function () {
      let result = false
      let val = 0
      let conditions = 0
      moves.forEach(move => {
        if (typeof move !== 'number') {
          val++
        }
      })
      winConditions.forEach(a => {
        if (a.every(elem => x.indexOf(elem) > -1)) {
          conditions++
        }
      })
      if (conditions === 0 && val === 9)
        result = true
      return result
    }
    // use hard-coded winConditions array to check outcome
    let i = 0
    while (!this.state.gameOver && i < winConditions.length) {
      // Check for victory
    if (winConditions[i].every(elem => x.indexOf(elem) > -1)) {
      this.setState({
        message: 'You win!',
        gameOver: true
      })
      // check for defeat
    } else if (winConditions[i].every(elem => o.indexOf(elem) > -1)) {
      this.setState({
        message: 'You lose!',
        gameOver: true
      })
    }
    else if (tieValue()) {
      this.setState({
        message: 'Its a tie!',
        gameOver: true
      })
    }
    i++
  }
  }
// Handle a click inside the game board.
handleClick (position) {
  // Allow a move if the space isn't occupied and the game isn't over
  if (!this.state.gameOver) {
    if (typeof this.state.moves[position] === 'number') {
      const arr = this.state.moves
      arr[position] = this.human
      this.setState({moves: arr})
      this.gameOver()
      this.aiTurn(this.bestSpot())
      this.gameOver()
    } else {
      this.setState({ message: 'Someone already went there!'})
    }
  }
}
// Call minimax function using the current board state
bestSpot () {
  const moves = this.state.moves.slice(0)
  let numMoves = 0
  moves.forEach(a => typeof a !== 'number' ? numMoves++ : '')
  return this.minimax(moves, this.ai, numMoves).index
}
// set the state to reflect the new ai move
aiTurn (bestSpot) {
  const arr = this.state.moves
  arr[bestSpot] = this.ai
  this.setState({moves: arr})
}

// randomMove () {
//   const availSpots = []
//   this.state.moves.forEach((a, i) => {
//     if (typeof a === 'number')
//       availSpots.push(i)
//   })
//   const randomIndex = Math.floor(Math.random() * availSpots.length)
//   return availSpots[randomIndex]
// }
// recursive function to find the best possible AI move given the current state of the board.
minimax (newBoard, player, numMoves) {
  // get available spots
	const availSpots = newBoard.filter(a => typeof a === 'number')
  // if human player wins this round return -10
	if (this.checkWin(newBoard, this.human)) {
    if (this.state.difficulty === 'easy') {
		  return {score: 10};
    } else if (this.state.difficulty === 'hard') {
      return {score: -10}
    } else if (this.state.difficulty === 'medium' && numMoves < 4) {
      return {score: -10}
    } else if (this.state.difficulty === 'medium' && numMoves >= 4) {
      return {score: 10}
    }
	} else if (this.checkWin(newBoard, this.ai)) {
    if (this.state.difficulty === 'easy') {
		  return {score: -10};
    } else if (this.state.difficulty === 'hard' || this.state.difficulty === 'medium') {
      return {score: 10}
    } else if (this.state.difficulty === 'medium' && numMoves < 4) {
      return {score: 10}
    } else if (this.state.difficulty === 'medium' && numMoves >= 4) {
      return {score: -10}
    }
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
			const result = this.minimax(newBoard, this.ai, numMoves);
      // give this move a score
			move.score = result.score;
		} else {
      // if ai player, recursively call this function with human player
			const result = this.minimax(newBoard, this.human, numMoves);
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

chooseDifficulty = (difficulty) => {
  this.setState({
    difficulty: difficulty.value
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
        <Header
          message={this.state.message}
          restart={this.restart}
          chooseDifficulty={this.chooseDifficulty}
          currentDifficulty={this.state.difficulty}/>
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

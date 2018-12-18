import React, {Component} from 'react'
import './Message.css'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class message extends Component  {

  render() {
    return (
      <React.Fragment>
        <div className='about'>
          <h3>Welcome to Unbeatable Tic Tac Toe</h3>
          <p>
            This game uses the minimax algorithm to make an artificially
            intelligent Tic Tac Toe opponent. By analysing every
            possible move based on the current board state, it is able to give
            each hypothetical move a score and return the move with the highest
            score. No matter how good you are at Tic Tac Toe, you can only tie or
            lose to the AI.
          </p>
          <p>
            Thanks to freeCodeCamp.org for making <a
            href='https://www.youtube.com/watch?v=P2TcQ3h0ipQ&t=1458s'>this </a>
            excellent video on how to use the minimax function in javascript. To
            learn more about minimax check out <a href='https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/'>this </a>
            article on GeeksForGeeks.
          </p>
          <p>
            If you somehow win, I would love to know about it! Hit me up on <a href='https://www.linkedin.com/in/jesse-gottlieb/'>LinkedIn.</a>
          </p>
        </div>
      </React.Fragment>
    )
  }
}

export default message

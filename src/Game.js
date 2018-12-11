import React, { Component } from 'react';

class Square extends Component {
  constructor (props) {
    super(props)

    this.state = {
      box: ''
    }
  }

  render () {
    const {position, player} = this.props

    return (
      <div className='square' onClick={() => this.props.handleClick(position)}>{player}</div>
    )
  }
}

export default Square

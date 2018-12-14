import React, { Component } from 'react';

class Square extends Component {
  constructor (props) {
    super(props)

    this.state = {
      box: ''
    }
  }

  render () {
    const {position, player, handleClick} = this.props
    return (
      <div className='square' onClick={() => handleClick(position)}>
        <div className='square-text'>
          {typeof player !== 'number' && player}
        </div>
      </div>
    )
  }
}

export default Square

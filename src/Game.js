import React, { Component } from 'react';

class Square extends Component {
  constructor (props) {
    super(props)

    this.state = {
      box: ''
    }
  }

  render () {
    const position = this.props.position

    return (
      <div className='square' onClick={() => this.props.handleClick(position)}>{this.props.position}</div>
    )
  }
}

export default Square

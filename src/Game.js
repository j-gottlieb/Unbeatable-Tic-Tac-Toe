import React, { Component } from 'react';

class Square extends Component {
  constructor (props) {
    super(props)

    this.state = {
      box: ''
    }
  }
  //
  // componentDidMount() {
  //
  //   }
  //
  //   componentWillUnmount() {
  //       // you need to unbind the same listener that was binded.
  //       window.removeEventListener('scroll', this.onScroll, false);
  //   }

  render () {
    const {position, player, handleClick} = this.props
    return (
      <div className='square' onClick={() => handleClick(position)}>
        <div className='square-text'>
          {player}
        </div>
      </div>
    )
  }
}

export default Square

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class App extends Component {
  static propTypes = {
    rotation: PropTypes.number,
    color: PropTypes.string
  }
  static defaultProps = {
    rotation: 0,
    color: 'skyblue'
  }

  componentDidMount() {
    const context = this.canvas.getContext('2d')
    context.clearRect(0, 0, 200, 200)
    this.paint(context)
  }
  paint(context) {
    context.save()
    context.translate(100, 100)
    context.rotate(this.props.rotation, 100, 100)
    context.fillStyle = this.props.color
    context.fillRect(-50, -50, 100, 100)
    context.restore()
  }
  render() {
    return <canvas width={200} height={200} ref={canvas => this.canvas = canvas} />
  }
}

export default App

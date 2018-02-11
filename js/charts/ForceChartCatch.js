import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

class ForceChart extends Component {
  constructor(props) {
    super(props)
    const { data, option } = this.props
    const { width, height } = option
    this.state = {
      data: data,
      width: width,
      height: height
    }
  }
  static propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
  }
  static defaultProps = {
    // defaultOption
  }
  componentDidMount() {
    console.log(this.state.data)
    const nodes = [
      { id: 1000, color: 'red' },
      { id: 1001, color: 'orange' },
      { id: 1002, color: 'yellow' },
      { id: 1003, color: 'green' },
      { id: 1004, color: 'cyan' },
      { id: 1005, color: 'blue' }
    ]
    const canvas = this.canvas
    const ctx = canvas.getContext('2d')
    const { width, height } = this.state

    const simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

    simulation.nodes(nodes)
      .on('tick', () => {
        ctx.clearRect(0, 0, width, height)
        nodes.forEach(node => {
          ctx.beginPath()
          ctx.fillStyle = node.color
          ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI)
          ctx.fill()
        })
      })
  }
  render() {
    const { width, height } = this.state
    return (
      <canvas width={width} height={height} ref={canvas => this.canvas = canvas} />
    )
  }
}

export default ForceChart

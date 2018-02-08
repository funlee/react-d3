import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BezierCurve extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    startPoint: PropTypes.arrayOf(PropTypes.number),
    endPoint: PropTypes.arrayOf(PropTypes.number),
    controlPoints: PropTypes.arrayOf(PropTypes.number)
  }
  static defaultProps = {
    width: 400,
    height: 400,
    startPoint: [0, 300],
    endPoint: [400, 300],
    controlPoints: [1, 0, 0, 1]
  }
  getPath(start, end, controlPoints) {
    const [fx, fy, sx, sy] = this.props.controlPoints
    const controlPoint01 = [start[0] + fx * (end[0] - start[0]), start[1] + fy * (end[1] - start[1])]
    const controlPoint02 = [start[0] + sx * (end[0] - start[0]), start[1] + sy * (end[1] - start[1])]
    return `M${start}c${controlPoint01} ${controlPoint02} ${end}`
  }
  render() {
    const { width, height, startPoint, endPoint, controlPoints } = this.props
    return (
      <svg width={width} height={height}>
        <path
          d={this.getPath(startPoint, endPoint, controlPoints)}
          fill='none'
          stroke='black'
          strokeWidth='6'
        />
      </svg>
    )
  }
}

export default BezierCurve

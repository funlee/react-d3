/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 21:52:34
 * @Last Modified time: 2018-02-09 21:52:34
 * @Description: 绘制折线 
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { getXScale, getYScale } from './utils'
import { line as shapeline, curveMonotoneX } from 'd3-shape'
class PathLine extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
  }
  static defaultProps = {
    // defaultOption
  }
  render() {
    const { data, option: { margin, width, height } } = this.props
    const { top, left, right, bottom } = margin
    const xScale = getXScale(data, width, margin)
    const yScale = getYScale(data, height, margin)
    const points = data.map((entry, index) => [xScale(index), yScale(entry)])
    const l = shapeline()
      .x(p => p[0] + left)
      .y(p => height - bottom - p[1])
      .defined(p => p[0] === +p[0] && p[1] === +p[1])
      .curve(curveMonotoneX)
    const path = l(points)
    const dots = points.map((entry, index) => (
      <circle key={`dot-${index}`} cx={entry[0] + left} cy={height - bottom - entry[1]} r={4} strokeWidth={2} fill="#fff" stroke="#ff7300" />
    ))
    return (
      <g className="line">
        <path d={path} fill="none" stroke="#ff7300" strokeWidth={2} />
        {dots}
      </g>
    )
  }
}
export default PathLine
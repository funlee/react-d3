/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 16:58:00
 * @Last Modified time: 2018-02-09 16:58:00
 * @Description: 绘制平面直角系图表 的 Y轴
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'

import { getYScale } from './utils'

class YAxis extends Component {
  static propTypes = {
    data: PropTypes.array,
    option: PropTypes.object
  }
  render() {
    const {
      data,
      option: {
        width,
        height,
        margin,
        yAxis: {
          color,
          fontSize
        }
      }
    } = this.props
    const { top, right, bottom, left } = margin
    const scale = getYScale(data, height, margin)
    const tickData = scale.ticks(5)

    const ticks = tickData.map((d, i) => {
      const y = scale(d)
      return (
        <g className="y-axis-tick" key={`tick-${i}`}>
          <line x1={left - 6} x2={left} y1={y} y2={y} stroke="#808080" />
          <text x={left - 10} y={y} dy={8} textAnchor="end" stroke={color} fontSize={fontSize}>{tickData[tickData.length - i]}</text>
        </g>
      )
    })
    return (
      <g className="y-axis">
        <line x1={left} y1={top} x2={left} y2={height - bottom} stroke="#808080" />
        {ticks}
      </g>
    )
  }
}

export default YAxis

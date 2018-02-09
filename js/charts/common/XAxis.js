/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 16:21:17
 * @Last Modified time: 2018-02-09 16:21:17
 * @Description: 绘制平面直角系图表 的 X轴
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'

import { getXScale } from './utils'

class XAxis extends Component {
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
        xAxis: {
          color,
          fontSize
        }
      }
    } = this.props
    const { top, left, right, bottom } = margin
    const y = height - bottom
    const scale = getXScale(data, width, margin)
    const ticks = data.map((d, i) => {
      return (
        <g className="x-axis-tick" key={`tick-${i}`}>
          <line x1={left + scale(i)} x2={left + scale(i)} y1={y} y2={y + 6} stroke={color} />
          <text x={left + scale(i)} y={y + 20} textAnchor='middle' fontSize={fontSize}>{d}</text>
        </g>
      )
    })
    return (
      <g className="x-axis">
        <line x1={left} y1={y} x2={width - left - right} y2={y} stroke="#808080" />
        {ticks}
      </g>
    )
  }
}

export default XAxis

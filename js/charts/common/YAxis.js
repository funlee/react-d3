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
    data: PropTypes.array.isRequired,
    option: PropTypes.object.isRequired
  }
  render() {
    const {
      data,
      option: {
        width,
        height,
        margin
      }
    } = this.props
    const { top, right, bottom, left } = margin
    const scale = getYScale(data, height, margin)
    const tickData = scale.ticks(5)
    const ticks = tickData.map((d, i) => {
      const y = height - bottom - scale(d)
      return (
        <g className="y-axis-tick" key={`tick-${i}`}>
          <line 
            x1={left - 6} 
            x2={left} 
            y1={y} 
            y2={y} 
            stroke='rgb(70,170,255)' 
          />
          <text 
            x={left - 10} 
            y={y} dy={8} 
            textAnchor='end'
            fontSize={16} 
            fill='#46aaff'
          >
          {tickData[i]}
          </text>
        </g>
      )
    })
    return (
      <g className="y-axis">
        <line 
          x1={left} 
          y1={top} 
          x2={left} 
          y2={height - bottom + 6} 
          stroke='rgba(70,170,255,0.6)' 
        />
        {ticks}
      </g>
    )
  }
}
export default YAxis
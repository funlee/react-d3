/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 17:25:15
 * @Last Modified time: 2018-02-09 17:25:15
 * @Description: 绘制柱状图 -- 矩形柱
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { getXScale, getYScale } from './utils'

class RectBar extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {

  }
  render() {
    const { data, option:{ margin, width, height }, fillId } = this.props
    const { top, left, right, bottom } = margin
    const xScale = getXScale(data, width, margin)
    const yScale = getYScale(data, height, margin)

    const barDOM = data.map((d, i) => (
      <g key={`bar-${i}`}>
        <rect
          x={left + xScale(i) - xScale.bandwidth() / 2}
          y={height - bottom - yScale(d)}
          width={xScale.bandwidth()}
          height={yScale(d)}
          fill={`url(#${fillId})`}
        >
          <animate
            attributeName='height'
            attributeType='XML'
            from='0' to={yScale(d)}
            begin='0s' dur='2s'
            fill='freeze'
          />
          <animate
            attributeName='y'
            attributeType='XML'
            from={height - bottom} to={height - bottom - yScale(d)}
            begin='0s' dur='2s'
            fill='freeze'
          />
        </rect>
      </g>
    ))
    return(
      <g className="rect-bar">
        {barDOM}
      </g>
    )
  }
}

export default RectBar

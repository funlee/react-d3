/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-23 10:26:01
 * @Last Modified time: 2018-02-23 10:26:01
 * @Description: D3v4 stack-Chart Component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { getXScale, getYScale } from './common/utils'
import XAxis from './common/XAxis'
import YAxis from './common/YAxis'

class StackChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  static propTypes = {
    // option: PropTypes.object.isRequired,
    // data: PropTypes.array.isRequired
  }
  static defaultProps = {
    // defaultOption
  }
  getAreaPath(series, xScale, yScale) {
    const { data, option } = this.props
    const { width, height, margin: { left, right, bottom, top } } = option
    const color = ['#A8C2B6', '#8DB9BE', '#6A7984', '#D06E6B','#F3F3F3']

    const area = d3.area()
      .x((d, i) => xScale(i) + left)
      .y0(d => height - yScale(d[0]) - bottom)
      .y1(d => height - yScale(d[1]) - bottom)
      .curve(d3.curveCatmullRom.alpha(0.5))

    const areaDOM = series.map((item, index) => (
      <g key={`node-${index}`}>
        <path
          fill={color[index]}
          opacity={0.5}
          d={area(item)}
        />
      </g>
    ))
    return areaDOM
  }
  render() {
    const { data, option } = this.props
    const { width, height, margin } = option

    const xData = []
    data.map(d => {
      xData.push(d.name)
    })

    const stackKeys = []
    for(let key in data[0]) {
      if(key != 'name') {
        stackKeys.push(key)
      }
    }

    const stack = d3.stack()
      .keys(stackKeys)
    const series = stack(data)

    // console.log(data)
    // console.log(series)

    const max = d3.max(series[series.length - 1], d => d[1])
    const xScale = getXScale(data, width, margin)
    const yScale = getYScale([0, max], height, margin)

    return (
      <svg width={width} height={height}>
        {this.getAreaPath(series, xScale, yScale)}
        <XAxis data={xData} option={option} />
        <YAxis data={[0,max]} option={option} />
      </svg>
    )
  }
}

export default StackChart

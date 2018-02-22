/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 09:10:42
 * @Last Modified time: 2018-02-09 09:10:42
 * @Description: D3v4 Bar-Chart Component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getRandomId } from './common/utils'
import GetLinearGradient from './common/GetLinearGradient'
import Tooltip from '../charts/common/Tooltip'

import * as d3 from 'd3'

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emOrder: -1,
      tooltipData: [{}],
      tooltipStyle: {}
    }
  }
  static propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
  }
  static defaultProps = {
    // defaultOption
  }
  emphasis(i, d, e) {
    const { width, height } = this.props.option
    this.setState({
      emOrder: i,
      tooltipData: [
        {
          name: d.data.name,
          value: d.data.value
        }
      ],
      tooltipStyle:{
        display: 'block',
        left: e.pageX  - (document.body.clientWidth - width) / 2 ,
        top: e.pageY - (document.body.clientHeight - height) / 2
      }
    })
  }
  normal() {
    this.setState({
      emOrder: -1,
      tooltipStyle: {
        display: 'none'
      }
    })
  }
  renderPiePath(data, option) {
    const { width, height } = option
    const pie = d3.pie()
      .value(d => d.value)
      .sort((a, b) => a.value - b.value)
    const pieData = pie(data)
    const outerRadius = width / 6
    const innerRadius = 0
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
    // v3 : d3.scale.category10()
    // v4 : d3.scaleOrdinal(d3.schemeCategory10)
    const color = d3.scaleOrdinal(d3.schemeCategory10)
    const piePathDOM = pieData.map((d, i) => (
      <g
        key={`bar-${i}`}
        transform={`translate(${width / 2}, ${height / 2})`}
        onMouseMove={this.emphasis.bind(this, i, d)}
        onMouseOut={this.normal.bind(this)}
      >
        <path
          fill={`rgba(74,140,229,${1 - i / 20})`}
          transform={this.state.emOrder === i ? `scale(${1 - i / 10 + 0.1}, ${1 - i / 10 + 0.1})` : `scale(${1 - i / 10},${1 - i / 10})`}
          d={arc(d)}
          stroke={`rgba(74,140,229,${1 - i / 20})`}
          strokeWidth={2}
        />
        <text className='arcs-value'
          transform={(
            d => {
              let x
              let y = arc.centroid(d)[1] * 2.4 + 6
              if (parseFloat(d.endAngle.toFixed(2)) <= parseFloat(Math.PI.toFixed(2))) {
                x = arc.centroid(d)[0] * 2.4 + 10 + 5
              } else {
                x = arc.centroid(d)[0] * 2.4 - 10 - 5
              }
              return 'translate(' + x + ',' + y + ')'
            })(d)
          }
          textAnchor={parseFloat((d.startAngle + ((d.endAngle - d.startAngle) / 2)).toFixed(2)) <= parseFloat(Math.PI.toFixed(2)) ? 'start' : 'end'}
        >
        {d.data.name}
        </text>
        <path
          d={(
            (d, i) => {
              let p1x = arc.centroid(d)[0] * 2 * (1 - i / 10)
              let p1y = arc.centroid(d)[1] * 2 * (1 - i / 10)
              let p2x = arc.centroid(d)[0] * 2.4
              let p2y = arc.centroid(d)[1] * 2.4
              let p3x
              // let p3y = p2y
              if (parseFloat((d.startAngle + ((d.endAngle - d.startAngle) / 2)).toFixed(2)) <= parseFloat(Math.PI.toFixed(2))) { //判断扇形中线所在的弧度是否超过半圆
                p3x = p2x + 10
              } else {
                p3x = p2x - 10
              }
              return 'M ' + p1x + ' ' + p1y + 'L ' + p2x + ' ' + p2y + 'L ' + p3x + ' ' + p2y
            }
          )(d, i)}
          stroke='#235894'
          fill='none'
          strokeWidth={2}
        />
      </g>
    ))
    return piePathDOM
  }
  render() {
    const { data, option } = this.props
    const { width, height} = option
    return (
      <div>
        <svg
          width={width}
          height={height}
          shapeRendering='geometricPrecision'
        >
          {this.renderPiePath(data.sort((a, b) => b.value - a.value), option)}
        </svg>
        <Tooltip data={this.state.tooltipData} style={this.state.tooltipStyle} />
      </div>
    )
  }
}
export default PieChart

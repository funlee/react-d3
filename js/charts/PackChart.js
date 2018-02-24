/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-23 10:26:01
 * @Last Modified time: 2018-02-23 10:26:01
 * @Description: D3v4 Pack-Chart Component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class PackChart extends Component {
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
  getNodes(data) {
    const color = d3.scaleSequential(d3.interpolateMagma)
      .domain([-4, 4])

    const nodeDOM = data.map((item, index) => (
      <g
        transform={`translate(${item.y},${item.x})`}
        key={`node-${index}`}
      >
        <circle
          r={item.r}
          fill={color(item.depth)}
        />
        <text
          dy={3}
          // x={item.children ? -8 : 8}
          textAnchor='middle'
          fontSize={10}
        >
          {item.children ? '' : item.data.name}
        </text>
      </g>
    ))
    return nodeDOM
  }
  render() {
    const { data, option } = this.props
    const { width, height, margin } = option
    console.log(data)

    const pack = d3.pack()
      .size([height, height- 50])
      // .radius(30)   ????
      .padding(3)

    const root = d3.hierarchy(data)
      .sum(d => d.value ? 1 : 0)
      .sort((a, b) => b.height - a.height || b.value - a.value)

    const nodesData = pack(root).descendants()

    // console.log(nodesData)
    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 4}, 0)`}>
          {this.getNodes(nodesData)}
        </g>
      </svg>
    )
  }
}

export default PackChart

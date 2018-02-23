/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-23 10:26:01
 * @Last Modified time: 2018-02-23 10:26:01
 * @Description: D3v4 cluster-Chart Component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class ClusterChart extends Component {
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
  radialPoint(x, y) {
    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
  }
  getLinks(data, colorIndex) {
    // 水平对角线
    const linkHorizontal = d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)

    // 垂直对角线
    const linkVertical = d3.linkVertical()
      .x(d => d.y)
      .y(d => d.x)

    // 圆形对角线
    const linkRadial = d3.linkRadial()
      .angle(d => d.x)
      .radius(d => d.y)
    const linksPath = data.map((item, index) => (
      <path
        className='link'
        key={`link-${index}`}
        fill='none'
        stroke='#ff7f0e'
        strokeWidth={1.5}
        d={(
          d => {
            return linkRadial(d)
          }
        )(item)}
      />
    ))
    return linksPath
  }
  getNodes(data) {
    const nodeDOM = data.map((item, index) => (
      <g
        transform={`translate(${this.radialPoint(item.x, item.y)})`}
        key={`node-${index}`}
      >
        <circle
          r={2.5}
          fill={item.children ? '#fff' : '#ff7f0e'}
          stroke='#ff7f0e'
        />
        <text
          dy='0.31em'
          x={item.x < Math.PI === !item.children ? 6 : -6}
          textAnchor={item.x < Math.PI === !item.children ? 'start' : 'end'}
          transform={`rotate(${(item.x < Math.PI ? item.x - Math.PI / 2 : item.x + Math.PI / 2) * 180 / Math.PI})`}
          fontSize={12}
          fill='#1f77b4'
        >
          {item.data.name}
        </text>
      </g>
    ))
    return nodeDOM
  }
  render() {
    const { data, option } = this.props
    const { width, height } = option

    const tree = d3.tree()
      .size([2 * Math.PI, width / 2 - 200])
      .separation((a, b) => { return (a.parent == b.parent ? 1 : 2) / a.depth })

    const root = d3.hierarchy(data)
    const linksData = tree(root).links()
    const nodesData = tree(root).descendants()
    // console.log(nodesData)
    // console.log(linksData)

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {this.getLinks(linksData)}
          {this.getNodes(nodesData)}
        </g>
      </svg>
    )
  }
}

export default ClusterChart

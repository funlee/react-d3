/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-23 10:26:01
 * @Last Modified time: 2018-02-23 10:26:01
 * @Description: D3v4 tree-Chart Component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class TreeChart extends Component {
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
  getLinks(data, colorIndex) {
    // 水平对角线
    const linkHorizontal = d3.linkHorizontal()
      .x(d => d.y )
      .y(d => d.x )

    // 垂直对角线
    const linkVertical = d3.linkVertical()
      .x(d => d.y)
      .y(d => d.x)

    // 圆形对角线
    const linkRadial = d3.linkRadial()
      .angle( d =>  d.x )
      .radius( d => d.y )
    const linksPath = data.map((item, index) => (
      <path
        className='link'
        key={`link-${index}`}
        fill='none'
        stroke='#1f77b4'
        strokeWidth={1.5}
        d={(
          d =>{
            return linkHorizontal(d)
          }
        )(item)}
      />
    ))
    return linksPath
  }
  getNodes(data) {
    const nodeDOM = data.map((item, index) => (
      <g
        transform={`translate(${item.y},${item.x})`}
        key={`node-${index}`}
        className={"node" + (item.children ? " node--internal" : " node--leaf")}
      >
        <circle
          r={2.5}
          fill={item.children ? '#fff' : '#1f77b4'}
          stroke='#1f77b4'
        />
        <text
          dy={3}
          x={item.children ? -8 : 8}
          textAnchor={item.children ? 'end' : 'start'}
          fontSize={12}
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

    var tree = d3.tree()
      .size([width - 300, height])
      .separation((a, b) => { return a.parent == b.parent ? 1 : 2 })

    const root = d3.hierarchy(data)
    const linksData = tree(root).links()
    const nodesData = tree(root).descendants()
    // console.log(nodesData)
    // console.log(linksData)

    return (
      <svg width={width} height={height}>
        <g transform={`translate(60,0)`}>
          {this.getLinks(linksData)}
          {this.getNodes(nodesData)}
        </g>
      </svg>
    )
  }
}

export default TreeChart

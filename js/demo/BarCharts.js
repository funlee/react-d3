/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-08 16:34:25
 * @Last Modified time: 2018-02-08 16:34:25
 * @Description: 使用 D3 绘制 UI
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from "d3"
class BarCharts extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.number),
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    })
  }
  static defaultProps = {
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }
  getXScale(data, width, margin) {
    return d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right - margin.left])
  }
  getYScale(data, height, margin) {
    return d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([margin.bottom, height - margin.top - margin.bottom])
  }
  componentDidMount() {
    const { width, height, data, margin, fillColor } = this.props
    const xScale = this.getXScale(data, width, margin)
    const yScale = this.getYScale(data, height, margin)
    const container = this.container
    const chart = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const barWidth = xScale.bandwidth()
    const bars = chart.selectAll('.bar')
      .data(data)
    bars.enter()
      .append('g')
      .classed('.bar', true)
      .attr('transform', (d, i) => `translate(${margin.left + i * barWidth}, 0)`)
      .append('rect')
      .attr('y', d => height - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', barWidth - 10)
      .attr('fill', fillColor)
  }
  render() {
    return (
      <div className="bar-chart" ref={container => this.container = container}></div>
    )
  }
}

export default BarCharts
// use
// import BarCharts from '../demo/BarCharts'

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <BarCharts
//           width={500}
//           height={500}
//           data={[10, 20, 30, 40, 30, 20, 10]}
//         />
//       </div>
//     )
//   }
// }

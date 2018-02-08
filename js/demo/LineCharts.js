/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-08 17:28:52
 * @Last Modified time: 2018-02-08 17:28:52
 * @Description: 使用 react 绘制 UI
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import { line as shapeline, curveMonotoneX } from 'd3-shape'

const renderXAxis = (scale, width, height, margin) => {
  const y = height - margin.bottom

  const ticks = scale.domain().map((entry, index) => {
    return (
      <g className="x-axis-tick" key={`tick-${index}`}>
        <line x1={scale(entry)} x2={scale(entry)} y1={y} y2={y + 6} stroke="#808080" />
        <text x={scale(entry)} y={y + 20} textAnchor="middle">{index + 1}</text>
      </g>
    )
  })
  return (
    <g className="x-axis">
      <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="#808080" />
      {ticks}
    </g>
  )
}

const renderYAxis = (scale, width, height, margin) => {
  const x = margin.left
  const yData = scale.ticks(5)
  const ticks = yData.map((entry, index) => {
    const y = scale(entry)
    return (
      <g className="y-axis-tick" key={`tick-${index}`}>
        <line x1={x - 6} x2={x} y1={y} y2={y} stroke="#808080" />
        <text x={x - 10} y={y} dy={8} textAnchor="end">{yData[yData.length - index]}</text>
      </g>
    )
  })
  return (
    <g className="y-axis">
      <line x1={x} y1={margin.top} x2={x} y2={height - margin.bottom} stroke="#808080" />
      {ticks}
    </g>
  )
}

const renderPath = (data, xScale, yScale, height, margin) => {
  const points = data.map((entry, index) => [xScale(index), yScale(entry)])
  const l = shapeline()
    .x(p => p[0])
    .y(p => height + margin.bottom - p[1])
    .defined(p => p[0] === +p[0] && p[1] === +p[1])
    .curve(curveMonotoneX)

  const path = l(points)

  const dots = points.map((entry, index) => (
    <circle key={`dot-${index}`} cx={entry[0]} cy={height + margin.bottom - entry[1]} r={4} strokeWidth={2} fill="#fff" stroke="#ff7300" />
  ))

  return (
    <g className="line">
      <path d={path} fill="none" stroke="#ff7300" strokeWidth={2} />
      {dots}
    </g>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }
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
    width: 500,
    height: 500,
    margin: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
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
    setInterval(()=>{
      let dataset = []
      d3.range(9).map(d => {
        dataset.push(parseInt(Math.random() * 100, 10))
      })
      this.setState({
        data: dataset
      })
      console.log(dataset)
    },10000)
  }
  render() {
    const { width, height, margin } = this.props
    const { data } = this.state
    const xScale = this.getXScale(data, width, margin)
    const yScale = this.getYScale(data, height, margin)
    return (
      <div>
        <svg width={width} height={height}>
          {renderXAxis(xScale, width, height, margin)}
          {renderYAxis(yScale, width, height, margin)}
          {renderPath(data, xScale, yScale, height, margin)}
        </svg>
      </div>
    )
  }
}

export default App

// use

// import React, { Component } from 'react'

// import LineCharts from '../demo/LineCharts'

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <LineCharts data={[10, 20, 30, 40, 50, 40, 30, 20, 10]} />
//       </div>
//     )
//   }
// }

// export default App

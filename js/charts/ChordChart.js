/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-22 15:39:04
 * @Last Modified time: 2018-02-22 15:39:04
 * @Description: D3v4 chord-Chart Component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

class ChordChart extends Component {
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
  getOuterPath(data, nameText) {
    const { option: { width } } = this.props
    const innerRadius = width / 2 * 0.5
    const outerRadius = innerRadius * 1.1

    const arcOuter = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const outerPath = data.map((item, index) => (
      <path
        className='outer-path'
        key={`outerPath-${index}`}
        fill={color(index)}
        d={arcOuter(item)}
      />
    ))
    const outerText = data.map((item, index) => (
      <text
        className='outer-text'
        key={`outerText-${index}`}
        dy='0.35em'
        transform = {(
          item => {
            let angle = (item.startAngle + item.endAngle) / 2
            let result = 'rotate(' + (angle * 180 / Math.PI) + ')'
            result += 'translate(0,' + -1.0 * (outerRadius + 10) + ')'
            if (angle > Math.PI * 3 / 4 && angle < Math.PI * 5 / 4)
              result += 'rotate(180)'
            return result
          })(item)
        }
      >
      { nameText[index] }
      </text>
    ))
    return (
      <g>
        {outerPath}
        {outerText}
      </g>
    )
  }
  getInnerPath(data) {
    const { option: { width } } = this.props
    const innerRadius = width / 2 * 0.5

    const ribbon = d3.ribbon()
      .radius(innerRadius)

    const color = d3.scaleOrdinal(d3.schemeCategory20)

    const innerPath = data.map((item, index) => (
      <path
        className='inner-path'
        key={`innerPath-${index}`}
        fill={color(index)}
        d={ribbon(item)}
      />
    ))

    return (
      <g>
        {innerPath}
      </g>
    )
  }
  render() {
    const { data, option } = this.props
    const { width, height } = option

    // console.log(data)

    var chord = d3.chord()
      .padAngle(0.03)
      .sortSubgroups(d3.ascending)

    const dataset = chord(data.numData)

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {this.getOuterPath(dataset.groups, data.nameData)}
          {this.getInnerPath(dataset)}
        </g>
      </svg>
    )
  }
}
export default ChordChart

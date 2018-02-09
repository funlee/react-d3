/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 09:10:42
 * @Last Modified time: 2018-02-09 09:10:42
 * @Description: D3v4 Bar-Chart Component
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import { getRandomId } from './common/utils'
import GetLinearGradient from './common/GetLinearGradient'
import RectBar from './common/RectBar'
import XAxis from './common/XAxis'
import YAxis from './common/YAxis'

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      normalId: getRandomId(),
      emphasizeId: getRandomId()
    }
  }
  static propTypes = {
    option:PropTypes.object,
    data: PropTypes.array
  }
  static defaultProps = {
    // defaultOption
  }
  emphasize() {
    // emphasize style
  }
  render() {
    const {
      data,
      option:{
        width,
        height,
        itemStyle:{
          normal,
          emphasize
        }
      }
    } = this.props

    let xData = []
    let yData = []

    data.map(d => {
      xData.push(d.name)
      yData.push(d.value)
    })

    const normalId = this.state.normalId
    const emphasizeId = this.state.emphasizeId

    return(
      <svg width={width} height={height}>
        <defs>
          <GetLinearGradient id={normalId} color={normal} />
          <GetLinearGradient id={emphasizeId} color={emphasize} />
        </defs>
        <RectBar data={yData} option={this.props.option} fillId={normalId}/>
        <XAxis data={xData} option={this.props.option} />
        <YAxis data={yData} option={this.props.option} />
      </svg>
    )
  }
}

export default BarChart

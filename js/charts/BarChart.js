/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 09:10:42
 * @Last Modified time: 2018-02-09 09:10:42
 * @Description: D3v4 Bar-Chart Component
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { getRandomId } from './common/utils'
import GetLinearGradient from './common/GetLinearGradient'
import RectBar from './common/RectBar'
import XAxis from './common/XAxis'
import YAxis from './common/YAxis'
import PathLine from './common/PathLine'
class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      normalId: getRandomId()
    }
  }
  static propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
  }
  static defaultProps = {
    // defaultOption
  }
  render() {
    const { data, option } = this.props
    const { width, height, itemStyle:{ normal } } = option
    let xData = []
    let yData = []
    data.map(d => {
      xData.push(d.name)
      yData.push(d.value)
    })
    const normalId = this.state.normalId
    return(
      <svg width={width} height={height}>
        <defs>
          <GetLinearGradient id={normalId} color={normal} />
        </defs>
        <RectBar data={yData} option={option} fillId={normalId} />
        <XAxis data={xData} option={option} />
        <YAxis data={yData} option={option} />
        <PathLine data={yData} option={option} />
      </svg>
    )
  }
}
export default BarChart
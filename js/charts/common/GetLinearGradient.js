/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 14:01:45
 * @Last Modified time: 2018-02-09 14:01:45
 * @Description: 生成 SVG  linearGradient 渐变
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'

class GetLinearGradient extends Component {
  static propTypes = {
    color: PropTypes.object,
    id: PropTypes.string
  }
  static defaultProps = {
    color: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 100,
      colorStops: [
        {
          offset: 0,
          color: 'red',
          opacity: 0.8
        },
        {
          offset: 100,
          color: 'blue',
          opacity: 0.8
        }
      ]
    }
  }
  render() {
    const { x1, y1, x2, y2, colorStops } = this.props.color
    const id = this.props.id
    const colorStopsDOM = colorStops.map((d, i) => (
      <stop
        key={i}
        offset={`${d.offset}%`}
        style={{stopColor:d.color,stopOpacity:d.opacity}}
      />
    ))
    return(
      <linearGradient
        id={id}
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
      >
      {colorStopsDOM}
      </linearGradient>
    )
  }
}

export default GetLinearGradient

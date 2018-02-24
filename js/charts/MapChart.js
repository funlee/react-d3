/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-23 10:26:01
 * @Last Modified time: 2018-02-23 10:26:01
 * @Description: D3v4 map-Chart Component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import Map from '../charts/common/Map'
import SouthChinaSea from '../charts/common/SouthChinaSea'

class MapChart extends Component {
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
  render() {
    const { data, option } = this.props
    const { width, height } = option

    return (
      <svg width={width} height={height}>
        <Map width={width} height={height} data={data} />
        <SouthChinaSea width={width} height={height} />
      </svg>
    )
  }
}

export default MapChart

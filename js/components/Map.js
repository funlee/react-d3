/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-23 10:23:26
 * @Last Modified time: 2018-02-23 10:23:26
 * @Description: 利用 TreeChart 绘制一个柱状图
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mock from 'mockjs'
import MapChart from '../charts/MapChart'

class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }
  getData() {
    return Mock.mock({
      'map|15-25': [{
        'id|+1': [1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        'value': '@natural(10,100)'
      }]
    })
  }
  renderOption() {
    return {
      width: 800,
      height: 500
    }
  }
  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     data: this.getData()
    //   })
    // }, 8000)
  }
  render() {
    return (
      <div>
        <MapChart data={this.state.data.map} option={this.renderOption()} />
      </div>
    )
  }
}

export default Tree

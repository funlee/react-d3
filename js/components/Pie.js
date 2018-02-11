/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-11 09:19:56
 * @Last Modified time: 2018-02-11 09:19:56
 * @Description: 利用 PieChart 绘制一个柱状图
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mock from 'mockjs'
import PieChart from '../charts/PieChart'
class Pie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }
  getData() {
    return Mock.mock({
      'pie|5': [
        {
          'name': '@first()',
          'value': '@natural(50, 100)'
        }
      ]
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
        <PieChart data={this.state.data.pie} option={this.renderOption()} />
      </div>
    )
  }
}
export default Pie

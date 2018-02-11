/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-11 15:54:21
 * @Last Modified time: 2018-02-11 15:54:21
 * @Description: 利用 ForceChart 绘制一个力导向图
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mock from 'mockjs'
import ForceChart from '../charts/ForceChart'

class Pie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }
  getData() {
    return Mock.mock({
      'force|5-8': [
        {
          'name': '@first()',
          'value': '@natural(20, 100)'
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
    setInterval(() => {
      this.setState({
        data: this.getData()
      })
    }, 8000)
  }
  render() {
    return (
      <div>
        <ForceChart data={this.state.data.force} option={this.renderOption()} />
      </div>
    )
  }
}
export default Pie

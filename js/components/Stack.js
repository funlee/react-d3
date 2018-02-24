/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-23 10:23:26
 * @Last Modified time: 2018-02-23 10:23:26
 * @Description: 利用 StackChart 绘制一个柱状图
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mock from 'mockjs'
import StackChart from '../charts/StackChart'

class Stack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }
  getData() {
    return Mock.mock({
      'stack|5-8': [
        {
          'name|+1':[2010,2011,2012,2013,2014,2015,2016,2017] ,
          'type1': '@natural(10, 300)',
          'type2': '@natural(30, 500)',
          'type3': '@natural(50, 700)'
        }
      ]
    })
  }
  renderOption() {
    return {
      width: 800,
      height: 500,
      margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 80
      }
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
        <StackChart data={this.state.data.stack} option={this.renderOption()} />
      </div>
    )
  }
}

export default Stack

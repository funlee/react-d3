/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-23 10:23:26
 * @Last Modified time: 2018-02-23 10:23:26
 * @Description: 利用 PackChart 绘制一个柱状图
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mock from 'mockjs'
import PackChart from '../charts/PackChart'

class Pack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }
  getData() {
    return Mock.mock({
      'pack': {
        'name': '@first()',
        'value':'@natural(10,100)',
        'children|6-10': [
          {
            'name': '@first()',
            'value':'@natural(10,100)',
            'children|2-4': [
              {
                'name': '@first()',
                'value':'@natural(10,100)',
                'children|1-3': [
                  {
                    'name': '@first()',
                    'value':'@natural(10,100)'
                  }
                ]
              }
            ]
          }
        ]
      }
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
        <PackChart data={this.state.data.pack} option={this.renderOption()} />
      </div>
    )
  }
}

export default Pack

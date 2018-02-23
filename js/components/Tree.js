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
import TreeChart from '../charts/TreeChart'

class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }
  getData() {
    return Mock.mock({
      'tree':{
        'name':'@first()',
        'children|4-6':[
          {
            'name':'@first()',
            'children|2-4':[
              {
                'name':'@first()',
                'children|1-3':[
                  {
                    'name':'@first()'
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
        <TreeChart data={this.state.data.tree} option={this.renderOption()} />
      </div>
    )
  }
}

export default Tree

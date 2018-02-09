/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 16:48:49
 * @Last Modified time: 2018-02-09 16:48:49
 * @Description: 利用 BarChart 绘制一个柱状图
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'

import Mock from 'mockjs'
import BarChart from '../charts/BarChart'

class Bar extends Component {
  renderOption() {
    return {
      width: 800,
      height: 500,
      margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 80
      },
      itemStyle: {
        normal: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 100,
          colorStops: [{
            offset: 0,
            color: 'red',
            opacity: 0.8
          },{
            offset: 100,
            color: 'blue',
            opacity: 0.8
          }]
        },
        emphasize: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 100,
          colorStops: [{
            offset: 0,
            color: 'blue',
            opacity: 0.8
          },{
            offset: 100,
            color: 'red',
            opacity: 0.8
          }]
        }
      },
      xAxis: {
        color: '#62a4f6',
        fontSize: 14
      },
      yAxis: {
        color: '#c3e2ff',
        fontSize: 16
      }
    }
  }
  render() {
    const dataset = Mock.mock({
      'bar|6':[
        {
          'name': '@first()',
          'value': '@natural(100, 1000)'
        }
      ]
    })

    return(
      <div>
        <BarChart data={dataset.bar} option={this.renderOption()} />
      </div>
    )
  }
}

export default Bar

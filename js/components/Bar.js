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
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }
  getData() {
    return Mock.mock({
      'bar|6': [
        {
          'name': '@first()',
          'value': '@natural(10, 1000)'
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
      },
      itemStyle: {
        normal: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 100,
          colorStops: [{
            offset: 0,
            color: '#00ffff', 
            opacity: 0.8
          },{
            offset: 100,
            color: '#4a8ce5',
            opacity: 0.8
          }]
        }
      }
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.getData()
      })
    },8000)
  }
  render() {
    return(
      <div>
        <BarChart data={this.state.data.bar} option={this.renderOption()} />
      </div>
    )
  }
}
export default Bar
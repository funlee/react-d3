/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-22 15:37:56
 * @Last Modified time: 2018-02-22 15:37:56
 * @Description: 利用 ChordChart 绘制一个弦图
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mock from 'mockjs'
import ChordChart from '../charts/ChordChart'

class Chord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }
  getData() {
    return Mock.mock({
      'chord|4-7': [
        {
          'name': '@first()',
          'value|+1': [20, 30, 40, 50, 60, 70, 80]
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
        <ChordChart data={this.state.data.chord} option={this.renderOption()} />
      </div>
    )
  }
}
export default Chord

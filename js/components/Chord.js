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
    const len = parseInt(Math.random() * 5, 10) + 4
    const str = 'QWERTYUIOPASDFGHJKLZXCVBNM'
    const nameData = []
    const numData = []
    for(let i = 0; i < len;i++) {
      const start = parseInt(Math.random() * 5, 10) + 2
      const spart = parseInt(Math.random() * 4, 10) + 2
      nameData.push(str.slice(start * 2, start * 2 + spart))

      const item = []
      for (let j = 0; j < len; j++) {
        const num = parseInt(Math.random() * 1000, 10) + 20
        item.push(num)
      }
      numData.push(item)
    }
    return {
      nameData:nameData,
      numData:numData
    }
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
        <ChordChart data={this.state.data} option={this.renderOption()} />
      </div>
    )
  }
}

export default Chord

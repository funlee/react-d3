/*
 * @Author: funlee
 * @Email: i@funlee.cn
 * @Date: 2018-02-09 11:19:47
 * @Last Modified time: 2018-02-09 11:19:47
 * @Description: 工具方法
 */
import * as d3 from 'd3'

/**
 * @param {Array} data 图表渲染数据
 * @param {Number} width  绘图容器的宽度
 * @param {Object} margin 图表绘制区域距离容器四周的间距
 */
export function getXScale(data, width, margin) {
  const { left, right } = margin
  return d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, width - left - right])
    .padding(0.8)
}

/**
 * @param {Array} data 图表渲染数据
 * @param {Number} height  绘图容器的高度
 * @param {Object} margin 图表绘制区域距离容器四周的间距
 */
export function getYScale(data, height, margin) {
  const { bottom, top } = margin
  return d3.scaleLinear()
    .domain([0, d3.max(data, d=> d * 1.2)])
    .range([0, height - bottom - top])
}

/**
 * 生成一个随机 ID
 */
export function getRandomId() {
  let id = 0
  const prefix = new Date().valueOf()
  return `funlee-${prefix}-${id++}`
}

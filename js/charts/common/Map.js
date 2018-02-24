import React,{ Component } from 'react'
import PropTypes from 'prop-types'

import root from '../../data/chinageo.json'
import * as topojson from 'topojson'
import * as d3 from 'd3'

class Map extends Component {
  constructor(props) {
    super(props)
    const { width, height, data } = this.props
    const rootData = root.features
    const scale = this.getZoomScale(rootData)
    const center = this.getCenters(rootData)
    const projection = d3.geoMercator()
      .scale(scale * 44)
      .center(center)
      .translate([width / 2, height / 2 + 20])
    const path = d3.geoPath(projection)
    this.state = {
      rootData: rootData,
      path: path,
      data: data,
      width: width,
      height: height
    }
  }
  static propTypes = {
    name: PropTypes.string,
  }
  static defaultProps = {
    name: 'funlee',
  }
  getZoomScale(features) {
    const { width, height } = this.props
    let longitudeMin = 100000 // 最小经度
    let latitudeMin = 100000 // 最小维度
    let longitudeMax = 0 // 最大经度
    let latitudeMax = 0 // 最大纬度
    features.map((e) => {
      let a = d3.geoPath().bounds(e) // [[最小经度，最小维度][最大经度，最大纬度]]
      if (a[0][0] < longitudeMin) {
        longitudeMin = a[0][0]
      }
      if (a[0][1] < latitudeMin) {
        latitudeMin = a[0][1]
      }
      if (a[1][0] > longitudeMax) {
        longitudeMax = a[1][0]
      }
      if (a[1][1] > latitudeMax) {
        latitudeMax = a[1][1]
      }
    })
    var a = longitudeMax - longitudeMin
    var b = latitudeMax - latitudeMin
    return Math.min(width / a, height / b)
  }
  getCenters(features) {
    let longitudeMin = 100000
    let latitudeMin = 100000
    let longitudeMax = 0
    let latitudeMax = 0
    features.forEach((e) => {
      let a = d3.geoPath().bounds(e)
      if (a[0][0] < longitudeMin) {
        longitudeMin = a[0][0]
      }
      if (a[0][1] < latitudeMin) {
        latitudeMin = a[0][1]
      }
      if (a[1][0] > longitudeMax) {
        longitudeMax = a[1][0]
      }
      if (a[1][1] > latitudeMax) {
        latitudeMax = a[1][1]
      }
    })
    let a = (longitudeMax + longitudeMin) / 2
    let b = (latitudeMax + latitudeMin) / 2
    return [a, b]
  }
  getMapPath() {
    const { rootData, path } = this.state
    const mapPathDOM = rootData.map((d, index) => (
      <path
        key={`map-${index}`}
        stroke='#404a59'
        strokeWidth={2}
        fill='#2A333D'
        opacity={0.9}
        d={path(d)}
      />
    ))

    return mapPathDOM
  }
  getDataDote() {
    const { rootData, path, data } = this.state
    const max = d3.max(data, d => d.value)
    const radius = d3.scaleLinear()
      .domain([0, max])
      .range([4, 8])

    const color = d3.scaleOrdinal(d3.schemeCategory20)

    const doteDOM = data.map((d, index) => (
      rootData.map(item => {
        if(item.properties.id === d.id) {
          let centroid = path.centroid(item)
          return (
            <g
              transform={`translate(${centroid[0]},${centroid[1]})`}
            >
              <circle
                r={radius(d.value)}
                fill={color(1)}
              />
              <circle
                r={radius(d.value) + 3}
                fill='none'
                stroke={color(1)}
              />
              <circle
                className={d.value > 80 ? 'animate-circle' : ''}
                r={radius(d.value) + 6}
                fill='none'
                stroke={color(1)}
              />
            </g>
          )
        }
      })
    ))
    return doteDOM
  }
  componentWillMount() {


  }
  render() {
    return(
      <g className='map-path'>
        {this.getMapPath()}
        {this.getDataDote()}
      </g>
    )
  }
}

export default Map

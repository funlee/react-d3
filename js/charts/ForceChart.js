import React,{ Component } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

class ForceChart extends Component {
  constructor(props) {
    super(props)
    const { data, option } = this.props
    const { width, height } = option
    this.state = {
      data: data,
      width: width,
      height: height
    }
  }
  static propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
  }
  static defaultProps = {
    // defaultOption
  }
  componentDidMount() {
    const canvas = this.canvas
    const ctx = canvas.getContext('2d')
    const { width, height } = this.state

    const colors = ['#D53A35', '#334B5C', '#6AB0B8', '#F3F3F3', '#9FDABF', '#7FAE90', '#F3F3F3', '#797B7F']

    let simulation = d3.forceSimulation()
      .velocityDecay(0.5)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide(12.5))

    simulation.alpha(1.5)
    simulation.alphaMin(0.001)
    simulation.alphaDecay(0.0228)
    simulation.alphaTarget(0)

    const num = 50
    let nodes = []
    let links = []

    for(let i = 0;i < num;i++) {
      nodes.push({id: i})
    }

    for(let i = 0;i < 5;i++) {
      links.push({
        source: i,
        target: (i + 1) % 5
      })
    }

    for(let i = 0;i < nodes.length;i++) {
      links.push({
        source: i % 5,
        target: i
      })
    }

    simulation.nodes(nodes)
      .on('tick', function(){
        ctx.clearRect(0, 0, width, height)
        ctx.lineWidth = 3
        ctx.strokeStyle = '#797B7F'
        ctx.beginPath()
        links.forEach(link => {
          ctx.moveTo(link.source.x, link.source.y)
          ctx.lineTo(link.target.x, link.target.y)
        })
        ctx.stroke()

        ctx.lineWidth = 3
        // ctx.strokeStyle = 'red'
        ctx.fillStyle = '#6AB0B8'

        nodes.forEach(node => {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI)
          ctx.fill()
          ctx.stroke()
        })
      })

    simulation.force('link',
      d3.forceLink()
        .links(links)
        .id(function (d) {
          return d.id
        })
        .distance(40)
    )

    d3.select(canvas)
      .call(d3.drag().container(canvas)
        .subject(() => simulation.find(d3.event.x, d3.event.y))
        .on('start', () => {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart()
          d3.event.subject.fx = d3.event.subject.x
          d3.event.subject.fy = d3.event.subject.y
        })
        .on('drag', () => {
          d3.event.subject.fx = d3.event.x
          d3.event.subject.fy = d3.event.y
        })
        .on('end', () => {
          if (!d3.event.active) simulation.alphaTarget(0)
          d3.event.subject.fx = null
          d3.event.subject.fy = null
        })
      )
  }
  render() {
    const { width, height } = this.state
    return(
      <canvas width={width} height={height} ref={canvas => this.canvas = canvas} />
    )
  }
}

export default ForceChart

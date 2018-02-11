import React,{ Component } from 'react'
import PropTypes from 'prop-types'

class Tooltip extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    data: PropTypes.array,
    style: PropTypes.object
  }
  static defaultProps = {
    data: [{
      name:'testName',
      value: 1
    }]
  }
  defaultStyle() {
    return {
      display: 'none',
      left: 0,
      top: 0,
      boxSizing: 'border-box',
      position: 'absolute',
      padding: '10px 15px',
      background: 'linear-gradient( -90deg, rgb(7,8,74) 0%, rgb(1,2,27) 90%)',
      borderRadius: '5px',
      border: '1px solid #928a82',
      color: '#e7f3fe',
      fontsize: '16px',
      zIndex: '999',
      whiteSpace: 'nowrap'
    }
  }
  render() {
    const style = Object.assign({}, this.defaultStyle(), this.props.style)
    const data = this.props.data
    const text = data.map(d => (
      `${d.name}: ${d.value}`
    ))
    return(
      <div style={style}>
        {text}
      </div>
    )
  }
}

export default Tooltip

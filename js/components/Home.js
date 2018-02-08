import React,{ Component } from 'react'

import LineCharts from '../demo/LineCharts'

class App extends Component {
  render() {
    return(
      <div>
        <LineCharts data={[10, 20, 30, 40, 50, 40, 30, 20, 10]} />
      </div>
    )
  }
}

export default App

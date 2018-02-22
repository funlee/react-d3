import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom'

import playTitle from 'play-title'
import '../css/style.scss'

import Home from './components/Home'
import Bar from './components/Bar'
import Pie from './components/Pie'
import Force from './components/Force'
import Chord from './components/Chord'

class App extends Component {
  render() {
    playTitle()
    return (
      <Router>
        <div>
          <nav>
            <span><NavLink exact to="/home">Home</NavLink></span>
            <span><NavLink exact to="/bar">Bar</NavLink></span>
            <span><NavLink exact to="/pie">Pie</NavLink></span>
            <span><NavLink exact to="/force">Force</NavLink></span>
            <span><NavLink exact to="/chord">Chord</NavLink></span>

          </nav>
          <div className="charts-wrap">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/bar" component={Bar} />
              <Route path="/pie" component={Pie} />
              <Route path="/force" component={Force} />
              <Route path="/chord" component={Chord} />

            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

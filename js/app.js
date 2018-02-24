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
import Tree from './components/Tree'
import Cluster from './components/Cluster'
import Stack from './components/Stack'
import Pack from './components/Pack'

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
            <span><NavLink exact to="/tree">Tree</NavLink></span>
            <span><NavLink exact to="/cluster">Cluster</NavLink></span>
            <span><NavLink exact to="/stack">Stack</NavLink></span>
            <span><NavLink exact to="/pack">Pack</NavLink></span>

          </nav>
          <div className="charts-wrap">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/bar" component={Bar} />
              <Route path="/pie" component={Pie} />
              <Route path="/force" component={Force} />
              <Route path="/chord" component={Chord} />
              <Route path="/tree" component={Tree} />
              <Route path="/cluster" component={Cluster} />
              <Route path="/stack" component={Stack} />
              <Route path="/pack" component={Pack} />

            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

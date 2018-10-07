import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import HomeView from './components/HomeView/HomeView'
import PollView from './components/PollView/PollView'
import CreatePollView from './components/CreatePollView/CreatePollView'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="parent">
          <Route exact path="/" component={HomeView}/>
          <Route path="/startpoll" component={CreatePollView}/>
          <Route path="/poll" component={PollView}/>
        </div>
      </Router>
    );
  }
}

export default App;

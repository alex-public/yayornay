import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeView from './components/HomeView/HomeView'
import PollView from './components/PollView/PollView'
import CreatePollView from './components/CreatePollView/CreatePollView'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="parent">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="title" color="inherit">
                Yay or Nay
              </Typography>
            </Toolbar>  
          </AppBar>
          <Route exact path="/" component={HomeView}/>
          <Route path="/startpoll" component={CreatePollView}/>
          <Route path="/poll/:pollId" component={PollView}/>
        </div>
      </Router>
    );
  }
}

export default App;

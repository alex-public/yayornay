import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router-dom'
import './HomeView.css';

class HomeView extends Component {
    constructor(props) {
      super(props)

      this.state = { 
        pollId: '',
        redirectPoll: false,
      }
    }

    onSubmit() {
      this.setState({redirectPoll: true})
    }

    renderPollRedirect = () => {
      if (this.state.redirectPoll) {
        return <Redirect to={'/poll/' + this.state.pollId} />
      }
    }
 
    render() {
      return (
        <div className="centered-form">
            <h2>Trying to vote?</h2>
            <div id="poll-input">
              <TextField
                style={{flex: 1}}
                label="poll id"
                value={this.state.pollId}
                onChange={event => this.setState({ pollId: event.target.value})}
              />
              <Button 
                id="thing1" 
                variant="contained"
                color="primary"
                onClick={() => this.onSubmit()}
              >
                Go
                <Icon>send</Icon>
              </Button>
            </div>
            <br />
            <Link id="to-create" to="/startpoll">...or create your own poll</Link>

            {this.renderPollRedirect()}
        </div>
      );
    }
  }
  
  export default HomeView;
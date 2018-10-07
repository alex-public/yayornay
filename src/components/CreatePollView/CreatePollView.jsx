import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import './CreatePollView.css';

class CreatePollView extends Component {
    constructor(props) {
      super(props);

      this.state = {
        question: '',
        options: [],
        pubkeys: [],
        organizerWallet: '',
        totalRewardFunds: null,
        reward: null,
      };
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    onSubmit() {
      const swal = window.swal;
      swal("Good job!", "You started a poll", "success");
    }

    render() {
      return (
        <div className="create-poll-view">
          <Typography variant="display1" gutterBottom>
            Start a Poll
          </Typography>
          <TextField
            id="question"
            className="input"
            name="question"
            label="question"
            value={this.state.question}
            margin="normal"
            onChange={this.handleInputChange.bind(this)}
            variant="filled"
          />
          <ChipInput
            style={{marginTop: 10}}
            className="input"
            label="poll options"
            defaultValue={this.state.options}
            onChange={options => this.setState({ options })}
          />
          <br/>
          <ChipInput
            style={{marginTop: 10}}
            className="input"
            label="voter public keys"
            defaultValue={this.state.pubkeys}
            onChange={pubkeys => this.setState({ pubkeys })}
          />
          <br/>
          <TextField
            className="input"
            name="organizerWallet"
            label="your wallet address"
            value={this.state.organizerWallet}
            margin="normal"
            onChange={this.handleInputChange.bind(this)}
          />
          <br/>
          <TextField
            className="input"
            name="totalRewardFunds"
            label="total funds"
            value={this.state.totalRewardFunds}
            margin="normal"
            onChange={this.handleInputChange.bind(this)}
            InputProps={{
              startAdornment: <InputAdornment position="start">ONT</InputAdornment>,
            }}
          />
          <br/>
          <TextField
            className="input"
            name="reward"
            label="voter reward"
            value={this.state.reward}
            margin="normal"
            onChange={this.handleInputChange.bind(this)}
            InputProps={{
              startAdornment: <InputAdornment position="start">ONT</InputAdornment>,
            }}
          />
          <Button
            className="button"
            variant="contained"
            color="primary"
            style={{ marginTop: 40 }}
            onClick={() => this.onSubmit() }
          >
            start poll
          </Button>
        </div>
      );
    }
  }
  
  export default CreatePollView;
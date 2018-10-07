import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Redirect } from 'react-router-dom'
import './CreatePollView.css';

class CreatePollView extends Component {
    constructor(props) {
      super(props);

      this.state = {
        question: '',
        options: [],
        pubkeys: [],
        organizerWallet: '',
        totalRewardFunds: 0,
        reward: 0,
        redirect: false,
      };
    }

    handleInputChange(event) {
      const target = event.target;
      let value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    onSubmit() {
      const swal = window.swal;
      swal({
        title: "You started a poll!",
        text: "let's see how it's doing...",
        icon: "success",
        button: "Aww yiss!",
      }).then(() => {
        this.setState({redirect: true});
      });
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/' />
      }
    }

    render() {
      return (
        <div className="centered-form">
          <h1>Start a Poll</h1>
          <TextField
            id="question"
            className="input"
            name="question"
            label="question"
            value={this.state.question}
            margin="normal"
            onChange={this.handleInputChange.bind(this)}
            variant="filled"
            fullWidthInput={true}
          />
          <ChipInput
            style={{marginTop: 10}}
            className="input"
            label="poll options"
            value={this.state.options}
            onAdd={item => this.setState({ options: this.state.options.concat(item.split(/[ ]{1,}/))})}
            onDelete={(_, targetIdx) => {
              const options = this.state.options.filter((_, index) => index != targetIdx)
              this.setState({ options })
            }}
            fullWidthInput={true}
          />
          <br/>
          <ChipInput
            style={{marginTop: 10}}
            className="input"
            label="voter public keys"
            value={this.state.pubkeys}
            onAdd={item => this.setState({ pubkeys: this.state.pubkeys.concat(item.split(/[ ]{1,}/))})}
            onDelete={(_, targetIdx) => {
              const pubkeys = this.state.pubkeys.filter((_, index) => index != targetIdx)
              this.setState({ pubkeys })
            }}
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
          {this.renderRedirect()}
        </div>
      );
    }
  }
  
  export default CreatePollView;
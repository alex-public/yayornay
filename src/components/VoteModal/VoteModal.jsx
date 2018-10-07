import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './VoteModal.css';

class VoteModal extends Component {
  incrementCount(index) {
    this.props.incrementCount(index)

    this.props.close();
  }

  render() {
    return (
      <Paper id="paper-thing" elevation={4}>
        {this.props.options.map((option, index) => {
          return (
            <div>
              <Button
                className="opt-btn"
                style={{margin: 10}}
                color="primary"
                onClick={() => { this.incrementCount(index) }}
                variant="contained"
              >
                {option}
              </Button>
              <br />
            </div>
          )
        })}
        <Button
          className="opt-btn"
          style={{margin: 10}}
          onClick={() => { this.props.close() }}
          variant="contained"
        >
          cancel
        </Button>
      </Paper>
    );
  }
}

export default VoteModal;
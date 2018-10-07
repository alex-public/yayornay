import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import VoteModal from '../VoteModal/VoteModal';
import Slide from '@material-ui/core/Slide';
import './PollView.css';

class PollView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pollId: this.props.match.params.pollId,
      options: ['burgers', 'pizza', 'hotdogs'],
      data: [12, 19, 3, 5, 2, 3],
      voteOpen: false,
    }
  }
  
  componentDidMount() {
    const Chart = window.Chart;
    const ctx = document.getElementById("myChart").getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: this.state.options,
            datasets: [{
                data: this.state.data,
                backgroundColor: CHART_COLORS,
            }]
        },
        options: CHART_OPTIONS
    });
  }

  openVoteModal() {
    this.setState({voteOpen: true})
  }

  closeVoteModal() {
    this.setState({voteOpen: false})
  }
  
  render() {
    return (
      <div className="centered-form">
          <h1>Poll: {this.state.pollId}</h1>
          <canvas id="myChart"></canvas>
          <Button
            id="make-vote"
            variant="extendedFab"
            color="primary"
            onClick={() => this.openVoteModal()}
          >
            <AddIcon />
            submit your vote
          </Button>
          <Slide direction="up" in={this.state.voteOpen} mountOnEnter unmountOnExit>
            <VoteModal
              options={ this.state.options }
              close={ () => this.closeVoteModal() }
            />
          </Slide>
      </div>
    );
  }
}

const mobileCheck = () => {
  if(window.innerWidth <= 800) {
    return true;
  } else {
    return false;
  }
}

const CHART_OPTIONS = { 
  legend: { display: false },
  scales: { 
    yAxes: [{ 
      ticks: { 
        fontSize: mobileCheck() ? 10 : 35,
        beginAtZero:true
      },
      gridLines: { display:false }
    }],
    xAxes: [{ 
      ticks: { 
        fontSize: mobileCheck() ? 10 : 30,
      },
      gridLines: { display:false }
    }]
  }
}

const CHART_COLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
]

export default PollView;
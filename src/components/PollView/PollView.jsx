import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import VoteModal from '../VoteModal/VoteModal';
import Slide from '@material-ui/core/Slide';
import { client } from 'ontology-dapi';
import './PollView.css';

const hex2a = (hexx) => {
  var hex = hexx.toString();//force conversion
  var str = '';
  for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

class PollView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pollId: this.props.match.params.pollId,
      options: ['burgers', 'pizza', 'hotdogs'],
      data: [0, 0, 0],
      voteOpen: false,
    }
  }

  updateChart() {
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
  
  componentDidMount() {
    this.updateChart()
  }

  openVoteModal() {
    this.setState({voteOpen: true})
  }

  closeVoteModal() {
    this.setState({voteOpen: false})
  }

  getData() {
    const contract = '154d30937ceb7ce32413cc5c89ee7b4f309dbac0';
    const method = 'Query';
    const parameters = [{type: "String", value: "my-data"}];

    client.api.smartContract.invokeRead({
      contract,
      method,
      parameters,
    }).then(result => {
      this.setState({data: JSON.parse(hex2a(result))})
    });
  }

  putData(data) {
    const contract = '154d30937ceb7ce32413cc5c89ee7b4f309dbac0';
    const method = 'Register';
    const gasPrice = 500;
    const gasLimit = 100000000;
    const dataString = JSON.stringify(data)
    const parameters = [{type: "String", value: "my-data"}, {type: "String", value: dataString}];

    client.api.smartContract.invoke({
      contract,
      method,
      parameters,
      gasPrice,
      gasLimit,
    });
  }

  componentDidUpdate() {
    this.updateChart()
  }
  
  render() {
    return (
      <div className="centered-form">
          <h1>Poll Results for {this.state.pollId}</h1>
          <canvas id="myChart"></canvas>
          <Button
            id="make-vote"
            variant="extendedFab"
            color="secondary"
            onClick={() => this.getData()}
          >
            refresh data
          </Button>
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
              data={ this.state.data }
              close={ () => this.closeVoteModal() }
              incrementCount={index => {
                let newData = this.state.data.slice();
                newData[index] += 1
                this.setState({ data: newData })
                this.putData(newData)
              }}
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
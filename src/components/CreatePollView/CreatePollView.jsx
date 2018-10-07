import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { client } from 'ontology-dapi';
import { Redirect } from 'react-router-dom'
import './CreatePollView.css';

class CreatePollView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      options: [],
      pubkeys: ['AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV', 'ANgV86zPQJ7AJPZHPbhuhS3qxzJKwiVqdo', 'AV2rBJ1CSa6eDz8aCU2j5Lg3xAXufpBys2', 'AFmseVrdL9f9oyCzZefL9tG6UbvhUMqNMV'],
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
    const code = CONTRACT_CODE;
    const name = 'poll contract';
    const version = '1.0';
    const author = 'eric wang';
    const email = 'ewang1997@gmail.com';
    const description = 'nothing';
    const needStorage = true;
    const gasPrice = 500;
    const gasLimit = 100000000;

    try {
      client.api.smartContract.deploy({
        code,
        name,
        version,
        author,
        email,
        description,
        needStorage,
        gasPrice,
        gasLimit
      }).then(() => {
        swal({
          title: "You started a poll!",
          text: "your contract hash is 154d30937ceb7ce32413cc5c89ee7b4f309dbac0",
          icon: "success",
          button: "Aww yiss!",
        }).then(() => {
          this.setState({redirect: true});
        });
      })
    } catch (e) {
      alert('onScDeploy canceled');
      console.log('onScDeploy error:', e);
    }
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
            const options = this.state.options.filter((_, index) => index !== targetIdx)
            this.setState({ options })
          }}
        />
        <br/>
        <ChipInput
          style={{marginTop: 10}}
          className="input"
          label="voter public keys"
          value={this.state.pubkeys}
          onAdd={item => this.setState({ pubkeys: this.state.pubkeys.concat(item.split(/[ ]{1,}/))})}
          onDelete={(_, targetIdx) => {
            const pubkeys = this.state.pubkeys.filter((_, index) => index !== targetIdx)
            this.setState({ pubkeys })
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

const CONTRACT_CODE = '54c56b6c766b00527ac46c766b51527ac4616c766b00c36c766b52527ac46c766b52c3055175657279876318006c766b52c308526567697374657287631b006235006c766b51c300c361653e006c766b53527ac4622b006c766b51c300c36c766b51c351c3617c6576006c766b53527ac4620e00006c766b53527ac46203006c766b53c3616c756652c56b6c766b00527ac46161681953797374656d2e53746f726167652e476574436f6e746578746c766b00c3617c681253797374656d2e53746f726167652e4765746c766b51527ac46203006c766b51c3616c756654c56b6c766b00527ac46c766b51527ac46161681953797374656d2e53746f726167652e476574436f6e746578746c766b00c3617c681253797374656d2e53746f726167652e4765746c766b52527ac461681953797374656d2e53746f726167652e476574436f6e746578746c766b00c36c766b51c3615272681253797374656d2e53746f726167652e50757461516c766b53527ac46203006c766b53c3616c7566';

export default CreatePollView;
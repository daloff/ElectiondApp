import React, { Component } from "react";
import PollCreation from "./contracts/PollCreation.json"
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { pollStatus: "", pollName: "", newPollName: "", web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PollCreation.networks[networkId];
      const instance = new web3.eth.Contract(
        PollCreation.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const candidates = ['Donalt Trump', 'Barack Obama']

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getPollStatus().call();

    // Update state with the result.
    this.setState({ pollStatus: response });
  };

  updatePollStatus = async (status) => {
    const { accounts, contract } = this.state;
    await contract.methods.setPollStatus(status).send({ from: accounts[0] });
    this.state.pollStatus = status;
    this.setState(this.state);
  }

  handleChange(event) {
    this.setState({pollName: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { accounts, contract, pollName } = this.state;
    await contract.methods.setPollName(pollName).send({ from: accounts[0] });
    this.setState({newPollName: pollName});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <img src={require("./logo.jpg")} width="100%"/>
        <h1>Decentralized Polling - The New Approach</h1>
        <p>Ready to start poll?</p>
        <p>
          <div> Poll Name: {this.state.newPollName}</div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.pollName} onChange={this.handleChange}/>
            <input type="submit" value="Submit" />
          </form>
        </p>
        <p>
        </p>
        <div>Poll Status: {this.state.pollStatus}</div>
        <div>
          <button type="submit" onClick={() => this.updatePollStatus('Poll is opened')}>
            Open Poll
          </button>
          <button type="submit" onClick={() => this.updatePollStatus('Poll is closed')}>
            Close Poll
          </button>
        </div>
      </div>
    );
  }
}

export default App;

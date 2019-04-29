import React, { Component } from "react";
import PollCreation from "./contracts/PollCreation.json"
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { pollStatus: "", web3: null, accounts: null, contract: null, newName:"" };

  componentDidMount = async () => {
    try {
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(event){
    this.setState({newName:event.target.value});
  }
  async handleSubmit(event){
    //Stops browser from refreshing onSubmit
    event.preventDefault();
    const { accounts, contract } = this.state;
    await contract.methods.setPollName(this.state.newName, {from:accounts[0]});
  }

  runExample = async () => {
    const { contract } = this.state;


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

  createThePoll = async(status) => {
    const {accounts, contract} = this.state;
    await contract.methods.constructor(status,status).send({ from: accounts[0]});
    this.state.constructor=status;
    this.setState(this.state);
  }
  updateNewname = async(status) => {
    const {accounts, contract} = this.state;
    await contract.methods.setPollName(status).send({ from: accounts[0]});
    this.state.setPollName = status;
    this.setState(this.state);
    
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Decentralized Polling</h1>
        <p>Ready to start poll?</p>
        <h2>The new approach</h2>
        <p>
          <div> Poll Name: {this.state.pollName}</div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.newValue} onChange={this.handleChange.bind(this)}/>
            <input type="submit" value="Submit" onClick={()=>this.updateNewname('Put there')}/>
          </form>
        </p>
        <p>
        </p>
        <div>The stored value is: {this.state.pollStatus}</div>
        <div>
          <button type="submit" onClick={() => this.updatePollStatus('Poll is opened')}>
            Open Poll
          </button>
          <button type="submit" onClick={() => this.updatePollStatus('Poll is closed')}>
            Close Poll
          </button>    
          <button type="submit" onClick={() => this.createThePoll('Poll One')}>Create</button>      
        </div>
      </div>
    );
  }
}

export default App;

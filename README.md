## Election dApp

### Description
This program uses Ethereum blockchain via Metamask and Ganache to provide basic functionality of an election polling

### Prerequisites
* Please make sure you have the following components installed, in order to run this program:
    * [Node.js | npm](https://www.npmjs.com/get-npm)
        * *`npm`* is used to install components below
    * [Solidity](https://www.npmjs.com/package/solc)
    * [Truffle](https://www.npmjs.com/package/truffle)
    * To verify that above components have installed correctly, please run *`truffle version`* that will produce something like this:
      ```sh
      > truffle version
      Truffle v5.0.7 (core: 5.0.7)
      Solidity v0.5.0 (solc-js)
      Node v11.11.0
      ```
    * [Ganache](https://truffleframework.com/ganache)
      * Personal Ethereum blockchain that can be run locally
    * [Metamask](https://metamask.io/)
      * Bridges frontend with backend by injecting a web3 instance into the window object of the browser
    * [React App](https://github.com/facebook/create-react-app)
      * This app uses React App for its frontend UI

-------
### How to Run
> Run the following commands from the root ElectiondApp folder:
```sh
# compile contracts
../ElectiondApp> truffle compile

# deploy contracts to Ganache
../ElectionApp> truffle migrate --reset

# nagivate to client code
../ElectiondApp> cd client

# install client dependencies - this may take a few minutes
../ElectiondApp/client> npm install

# run the client app that should automatically open in your browser
../ElectiondApp/client> npm start run
```
### Screenshot
![Election dApp](/screenshot.jpg)
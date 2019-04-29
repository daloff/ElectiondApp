var PollCreation = artifacts.require("./PollCreation.sol");

module.exports = function(deployer) {
    let args = ['Donald Trump', 'Barack Obama', 'Joe Biden'];
    //deployer.deploy(PollCreation,["Poll 1"],5000);
    deployer.deploy(PollCreation, args.map((arg) => web3.utils.asciiToHex(arg)), 1000000000);
};

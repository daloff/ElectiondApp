//Smart contracts change the blockchain's state
//This migration file updates the state.
const Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

const LandContracts = artifacts.require("Land_Contract");

module.exports = function (deployer) {
  deployer.deploy(LandContracts);
};
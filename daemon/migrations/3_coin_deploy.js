var TEST = artifacts.require("TEST");
module.exports = function (deployer) {
  deployer.deploy(TEST, "TEST", "TT");
};

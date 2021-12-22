var simpleToken = artifacts.require("SimpleToken");
module.exports = function (deployer) {
  deployer.deploy(simpleToken, "SimpleToken", "SMT");
};

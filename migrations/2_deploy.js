var Pony = artifacts.require("./Pony.sol");

module.exports = function(deployer) {
  var paymentTokenAddress = "0xe0728a9d55ebd03bfcc6e9faa59e6dfe96741636";  
  deployer.deploy(Pony, paymentTokenAddress);
};
var SmartCity = artifacts.require("./SmartCity.sol");
var Bill = artifacts.require("./Bill.sol");
var Auction = artifacts.require("./Auction.sol");
var Ticket = artifacts.require("./Ticket.sol");
var Grievance = artifacts.require("./Grievance.sol");

module.exports = function(deployer) {
  deployer.deploy(SmartCity);
  deployer.deploy(Bill);
  deployer.deploy(Grievance);
  deployer.deploy(Auction);
  deployer.deploy(Ticket);
};
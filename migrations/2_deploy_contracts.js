const { ethers } = require("ethers");

var dazaToken = artifacts.require("./dazaDex/dazaToken.sol");
var dazaDex = artifacts.require("./dazaDex/dazaDex.sol");
var parseEther = ethers.utils.parseEther;



module.exports = async function(deployer, network, accounts) {

    await deployer.deploy(dazaToken);
    const daza = await dazaToken.deployed();

    const dazadex = await deployer.deploy(dazaDex, daza.address);
    // Send some Daza to wallet
    await daza.transfer(accounts[1], parseEther('100'));

    // Approve Daza to be used on the DEX..
    await daza.approve(dazaDex.address, parseEther('100'));
    // Initialize DEX with 10 DAZA and 1 ETH
    await dazadex.createDex(parseEther('10'), {value:parseEther('1.0')});

    //show emitted log for CreateDex since call is not contractinternal.
    const _dex = new web3.eth.Contract(dazadex.abi, dazadex.address)
    _dex.getPastEvents("allEvents", {fromBlock: 0, toBlock: "latest"})
    .then(console.log)
};

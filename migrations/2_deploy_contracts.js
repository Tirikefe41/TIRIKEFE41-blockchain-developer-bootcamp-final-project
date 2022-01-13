var dazaToken = artifacts.require("./dazaDex/dazaToken.sol");
var dazaDex = artifacts.require("./dazaDex/dazaDex.sol");
var ethers = require('ethers');



module.exports = async function(deployer, network, accounts) {

    await deployer.deploy(dazaToken);
    const daza = await dazaToken.deployed();

    const dazadex = await deployer.deploy(dazaDex, daza.address);
    // Send some Daza to wallet
    await daza.transfer(accounts[0], 100000);

    // Approve Daza to be used on the DEX..
    await daza.approve(dazaDex.address, ethers.utils.parseEther('20'));
    await dazadex.createDex(ethers.utils.parseEther('10'), {value:ethers.utils.parseEther('0.10')});

};

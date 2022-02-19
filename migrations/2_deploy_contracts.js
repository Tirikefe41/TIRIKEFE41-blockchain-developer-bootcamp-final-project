var dazaToken = artifacts.require("./dazaDex/dazaToken.sol");
var dazaDex = artifacts.require("./dazaDex/dazaDex.sol");

// var web3 = require('web')

var {toWei} = web3.utils



module.exports = async function(deployer, network, accounts) {

    // const wallet = "";

    await deployer.deploy(dazaToken);
    const daza = await dazaToken.deployed();

    const dazadex = await deployer.deploy(dazaDex, daza.address);

    // Approve Daza to be used on the DEX..
    await daza.approve(dazaDex.address, toWei('200'));
    // Initialize DEX with 100 DAZA and 1 ETH
    await dazadex.createDex(toWei('100'), {value:toWei('1.0')});

    //show emitted log for CreateDex since call is not contractinternal.
    const _dex = new web3.eth.Contract(dazadex.abi, dazadex.address)
    _dex.getPastEvents("allEvents", {fromBlock: 0, toBlock: "latest"})
    .then(console.log)
};
const dazaDex = artifacts.require("dazaDex");
const dazaToken = artifacts.require("dazaToken");
var ethers = require('ethers');
let BN = web3.utils.BN;

contract("dazaDex", function (accounts) {
  const wallet = accounts[1];


  let instance;
  let tokenStance;

  beforeEach(async () => {
    instance = await dazaDex.deployed();
    tokenStance = await dazaToken.deployed();
  });

  describe('DEX initializations...', () => {
    it("should have reserved Liquidity equal to init contract balance of 1 ETH", async function () {
      const _reserve =  new BN(await instance.reserveLiquidity.call()).toString();
      assert.equal(ethers.utils.formatEther(_reserve), '1.0', "Exchange Contract balance invalid")
    });
  
    it("should have 100 DAZA tokens in WalletBalance.", async function () {
      const balance = new BN(await tokenStance.balanceOf(wallet)).toString();
      // check to see if 100 DAZA was deposited to accountWallet...
      assert.equal(ethers.utils.formatEther(balance), '100.0', "Initial Wallet token not credited");
    });
  
    it("should have 10 DAZA tokens  in DexBalance.", async function () {
      const _balance = new BN(await tokenStance.balanceOf(instance.address)).toString();
      // check to see if 10 DAZA was deposited to DEX on creation...
      assert.equal(ethers.utils.formatEther(_balance), '10.0', "Initial exchange token not credited");
    });   
  });  
  
  describe("Token swapping tests...", () => {

    it("Should update Contract ETH balance for a DAZA swap ", async function (){
      const _initBal = new BN(await web3.eth.getBalance(instance.address)).toString();
  
      // Perform Swap
      await instance.ETHtoDAZA(ethers.utils.parseEther('3'));
      const dd = ethers.utils.formatEther(new BN(await instance.getDexed()).toString());
      
      // Get ETH balance after swap...instance.address
      const _endBal = new BN (await web3.eth.getBalance(instance.address)).toString();
  
      const _diff = ethers.utils.formatEther(_initBal) - ethers.utils.formatEther(_endBal);
  
      assert.equal(parseFloat(_diff).toFixed(4), parseFloat(dd).toFixed(4), 'Swap results in wrong ETH balance update');
    });
  
    it("Should update contract DAZA balance for a DAZA swap", async function (){
      const _initDaza = new BN(await tokenStance.balanceOf(instance.address)).toString();
      const swapAmt = 4;
  
      // Perform Swap
      await instance.ETHtoDAZA(ethers.utils.parseEther(swapAmt.toString()));
      
      // Get ETH balance after swap...
      const _finalDaza = new BN(await tokenStance.balanceOf(instance.address)).toString();
      const _diff = ethers.utils.formatEther(_finalDaza) - ethers.utils.formatEther(_initDaza);
      assert.equal(_diff, swapAmt, 'Swap results in wrong ETH balance update');
      instance.address
    });
  

  });

  describe("Liquidity Provisioning...", ()=> {

    it("Should track ETH balance update for added liquidity", async function(){

      const ethBal = ethers.utils.formatEther(new BN(await web3.eth.getBalance(instance.address)).toString());
      await instance.addLiquidity({value:ethers.utils.parseEther('0.1')});

      const nowethBal = ethers.utils.formatEther(new BN(await web3.eth.getBalance(instance.address)).toString());

      assert.isBelow(Number(ethBal), Number(nowethBal), 'ETH liquidity not update on transaction');

    });

    it("Should track DAZA balance update for added liquidity", async function(){
      const dazaBal = ethers.utils.formatEther(new BN(await tokenStance.balanceOf(instance.address)).toString());
      // console.log(`Daza current balance: ${dazaBal}`);
      await instance.addLiquidity({value:ethers.utils.parseEther('0.01')});

      const dazaNow = ethers.utils.formatEther(new BN(await tokenStance.balanceOf(instance.address)).toString());

      assert.isBelow(Number(dazaBal), Number(dazaNow), 'DAZA liquidity not updated on transaction');

    });

    it("Should check DEX liquidity Update", async function(){
      const currLiq = ethers.utils.formatEther(new BN(await instance.reserveLiquidity.call()).toString());

      await instance.addLiquidity({value:ethers.utils.parseEther('0.01')});

      const afterLiq = ethers.utils.formatEther(new BN(await instance.reserveLiquidity.call()).toString());

      assert.isBelow(Number(currLiq), Number(afterLiq), 'DEX liquidity not updated on transaction');

    });

  });
});

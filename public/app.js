
var deployWallet = "0x622cDE3DdF9639aaC49f290C48EA01a5590a9675"
var deployprivateKey = "44ee0459222933491659e568cd4e124a096f5aac0cf811b3391978e592bd6c65"


window.addEventListener('load', function() {
  
    if (typeof window.ethereum !== 'undefined') {
      console.log('window.ethereum is enabled')
      if (window.ethereum.isMetaMask === true) {
        console.log('MetaMask is active')
        // let mmDetected = document.getElementById('mm-detected')
        // mmDetected.innerHTML += 'MetaMask Is Available!
        
  
      } else {
        console.log('MetaMask is not available')
        // let mmDetected = document.getElementById('mm-detected')
        // mmDetected.innerHTML += 'MetaMask Not Available!'
        // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
        // mmDetected.appendChild(node)
      }
    } else {
      console.log('window.ethereum is not found')
    //   let mmDetected = document.getElementById('mm-detected')
    //   mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
    }
  })

  var web3 = new Web3(window.ethereum);

  
  var {BN, toWei, toHex, fromWei} = web3.utils;
  var dazaToken = new web3.eth.Contract(dazaTokenABI, dazaTokenca, {from: deployWallet});
  var _dazaDex = new web3.eth.Contract(dazaDEXABI, dazaDEXca);


  const connect = document.getElementById('walletconnect');

  connect.onclick = async () => {
        
        await ethereum.request(
                    {
              method: "eth_requestAccounts"})  
        
        let mywalletAddress = ethereum.selectedAddress;
        
        // Tracked labels...
        const walletBalance = document.getElementById('Balance1');
        const walletAddress = document.getElementById('Address1');
        const Dexstatus = document.getElementById('Dexstatus');
        
        // Scalp records...
        let balance =new BN(await web3.eth.getBalance(mywalletAddress));
        let _balance = fromWei(balance, 'ether');

        walletBalance.innerHTML = _balance;
        walletAddress.innerHTML = mywalletAddress;
        
        //Initialize contract window objects
        _dazaDex.setProvider(window.ethereum);
        

        // Transfer DAZA to current wallet       

        let count = await web3.eth.getTransactionCount(deployWallet);
        console.log(`num transactions so far: ${count}`);

        let dazabal = await dazaToken.methods.balanceOf(deployWallet).call();
        console.log(`Deploy Balance before send: ${dazabal}`);
        
        let _data = await dazaToken.methods.transfer(mywalletAddress, new BN(toWei('10', 'ether'))).encodeABI();

        var rawTransaction = {
                  from: deployWallet,
                  gasPrice: 2 * 1e9,
                  gasLimit:210000,
                  to: dazaToken._address,
                  data: _data,
                  nonce: count,
                  chainId: 5777
                } 

        web3.eth.accounts.signTransaction(rawTransaction, deployprivateKey).then( signed => {

          web3.eth.sendSignedTransaction(signed.rawTransaction).then(async () =>
          {

            let dbal = await dazaToken.methods.balanceOf(mywalletAddress).call();
            console.log(`Token balance after send: ${dbal}`);
            let _dazabal = await dazaToken.methods.balanceOf(deployWallet).call();
            console.log(`Deploy Balance after send: ${_dazabal}`);

            const tokenImage = 'http://placekitten.com/200/300';
            try {
              // wasAdded is a boolean. Like any RPC method, an error may be thrown.
              const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20', // Initially only supports ERC20, but eventually more!
                  options: {
                    address: dazaToken._address, // The address that the token is at.
                    symbol: 'DAZA', // A ticker symbol or shorthand, up to 5 chars.
                    decimals: 18, // The number of decimals in the token.
                    image: tokenImage, // A string url of the token logo.
                  },
                },
              });
            
              if (wasAdded) {
                console.log('Token Added successfully!');


                let reserveLiquidity = fromWei(new BN(await _dazaDex.methods.reserveLiquidity().call()).toString());
                
                console.log(`reserveLiquidity: ${reserveLiquidity}`)

                // let dazaPrice = await _dazaDex.methods.dexPricing(toWei('0.5', 'ether'), toWei('20', 'ether'), toWei('1.0', 'ether')).send({from: mywalletAddress})
                // Object.keys(dazaPrice).forEach((prop)=> console.log(prop));
                // console.log(`Price: ${dazaPrice}`)

                if (parseFloat(reserveLiquidity) > 0){
                  console.log('Dex already initialized')
                  Dexstatus.innerHTML = `Dex preInitialized...`;
                }else{
                  await dazaToken.methods.approve(_dazaDex._address, toWei('200', 'ether')).send({from: mywalletAddress});
                  await _dazaDex.methods.createDex(toWei('20', 'ether')).send({from: mywalletAddress, value: new BN(toWei('1.0', 'ether'))});       
                }               

              } else {
                console.log('Token not added');
              }
            } catch (error) {
              console.log(error);
            }  
              } );
          }); 
        }
        
window.addEventListener("load", async function () {

  function swap() {
    let inputs = {
      tokenName: document.getElementById("tokenName"),
      tokenValue: document.getElementById("tokenAmount").value,
    };

    console.log("swap:");
    console.log(inputs.tokenName);
    console.log(inputs.tokenValue);

    if (inputs.tokenName == 'ETH'){
      _dazaDex.methods.ETHtoDAZA();

    }else if (inputs.tokenName == 'DAZA'){
      _dazaDex.methods.DAZAtoETH();
    }else{

    }
  }
  function addLiquidity() {
    let inputs = {
      tokenName: document.getElementById("liquidityToken").value,
      tokenValue: document.getElementById("liquidityAmount").value,
    };

    console.log("liquidate:");
    console.log(inputs.tokenName);
    console.log(inputs.tokenValue);
  }
  // Access our swap form...
  const swapForm = document.getElementById("swapForm");

  // ...to take over the submit event
  swapForm.addEventListener("submit", function (event) {
    event.preventDefault();
    swap();
  });

  //access our add liquidity form
  const liquidityForm = document.getElementById("liquidityForm");

  // ...to take over the submit event
  liquidityForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addLiquidity();
  });
});

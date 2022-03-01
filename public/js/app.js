


window.addEventListener('load', function() {
  
    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.isMetaMask === true) {
        // console.log('MetaMask is active');

      } else {
        console.log('MetaMask is not available');
        alert('MetaMask is not available install from metamask.io');
      }
    } else {
      console.log('window.ethereum is not found');
      alert('MetaMask is not available install from metamask.io');

    //   let mmDetected = document.getElementById('mm-detected')
    //   mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
    }
  })

var web3 = new Web3(window.ethereum);


var {BN, toWei, toHex, fromWei} = web3.utils;
var {address} = web3.eth.accounts.privateKeyToAccount(deployprivateKey);

var deployWallet = address;
var dazaToken = new web3.eth.Contract(dazaTokenABI, dazaTokenca, {from: deployWallet});
var _dazaDex = new web3.eth.Contract(dazaDEXABI, dazaDEXca);

var mywalletAddress;
var initTransfer = false;


const connect = document.getElementById('walletconnect');
connect.onclick = async () => {
      
      await ethereum.request(
                  {
            method: "eth_requestAccounts"})  
      
      mywalletAddress = ethereum.selectedAddress;
      
      // Tracked labels...
      const Dexstatus = document.getElementById('Dexstatus');
      
      //Initialize contract window objects
      _dazaDex.setProvider(window.ethereum);
      
      let _chainId = await web3.eth.net.getId();

      // Transfer DAZA to current wallet       

      let count = await web3.eth.getTransactionCount(deployWallet);
      // console.log(`num transactions so far: ${count}`);

      let dazabal = await dazaToken.methods.balanceOf(deployWallet).call();
      console.log(`Deploy Balance before send: ${dazabal}`);
      
      let gas = await web3.eth.getGasPrice();
      console.log(gas)
      let _data = await dazaToken.methods.transfer(mywalletAddress, new BN(toWei('300', 'ether'))).encodeABI();
      let reserveLiquidity = fromWei(new BN(await _dazaDex.methods.reserveLiquidity().call()).toString());

      var rawTransaction = {
                from: deployWallet,
                gasPrice: gas,
                gasLimit:5500000,
                to: dazaToken._address,
                data: _data,
                nonce: count,
                chainId: _chainId
              }
              
      if(!initTransfer && (parseFloat(reserveLiquidity) > 0)){

        web3.eth.accounts.signTransaction(rawTransaction, deployprivateKey).then( signed => {

          web3.eth.sendSignedTransaction(signed.rawTransaction).then(async () =>
          {  
            const tokenImage = 'http://placekitten.com/200/300';
            try {
              const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20',
                  options: {
                    address: dazaToken._address, 
                    symbol: 'DAZA',
                    decimals: 18, 
                    image: tokenImage, 
                  },
                },
              });
            
              if (wasAdded) {
                // console.log('Token Added successfully!');
                await dazaToken.methods.approve(_dazaDex._address, toWei('200', 'ether')).send({from: mywalletAddress});
                initTransfer = true;
                
                Dexstatus.innerHTML = `Prenitialized`;           

              } else {
                console.log('Token not added');
              }
            } catch (error) {
              console.log(error);
            }  
              } );
          }); 

      }
      else if( parseFloat(reserveLiquidity) <= 0){
        Dexstatus.innerHTML = `Not Initialized...`; 
        }
      }
        
window.addEventListener("load", async function () {

  async function swap() {
    let inputs = {
      dazaeth: document.getElementById('dazaeth'),
      ethreserve: document.getElementById('ethreserve'),
      dazareserve: document.getElementById('dazareserve'),
      tokenName: document.getElementById("tokenName").value,
      tokenValue: document.getElementById("tokenAmount").value,
    };

    console.log("swap:");
    console.log(typeof(inputs.tokenName));
    console.log(typeof(inputs.tokenValue));

    // const initBal = fromWei(new BN(await web3.eth.getBalance(_dazaDex._address)).toString());
    // Object.keys(_dazaDex.methods).forEach((prop)=> console.log(prop));

    let bals = await getUpdateBal();
    let comPrice =  parseFloat(inputs.tokenValue) * parseFloat(bals.price);

    if (inputs.tokenName === 'eth'){
      console.log('Balance checked')             

          if ((parseFloat(inputs.tokenValue) < bals.finalBal) && (comPrice < bals.tokenBal)){
              await _dazaDex.methods.ETHtoDAZA().send({from:mywalletAddress,value: new BN(toWei(inputs.tokenValue))});
              updateDEXui(inputs);               
            }     
          else{
            alert(`Enter a smaller swap amount`);
          }

    }else if (inputs.tokenName === 'daza'){

            if((parseFloat(inputs.tokenValue) < bals.tokenBal) && (comPrice < bals.finalBal)){
              await _dazaDex.methods.DazatoETH(new BN(toWei(inputs.tokenValue))).send({from:mywalletAddress}); 
              updateDEXui(inputs);
            }
            else{
              alert(`Enter a smaller swap amount`);
            }
              
    }else{
          alert('Select swap token option')
    }
  }
  async function addLiquidity() {

    let inputs = {      
      dazaeth: document.getElementById('dazaeth'),
      ethreserve: document.getElementById('ethreserve'),
      dazareserve: document.getElementById('dazareserve'),
      tokenName: document.getElementById("liquidityToken").value,
      tokenValue: document.getElementById("liquidityAmount").value,   
    };

    // console.log("liquidate:");
    // console.log(inputs.tokenName);
    // console.log(inputs.tokenValue);
    // let owner = await _dazaDex.methods.owner().call().toString();

    if (inputs.tokenName.toString() === 'add'){
      await _dazaDex.methods.addLiquidity().send({from:mywalletAddress,value: new BN(toWei(inputs.tokenValue))});
      updateDEXui(inputs);

    }else if (inputs.tokenName.toString() === 'remove'){
      
      // if(mywalletAddress == owner){
      //   await _dazaDex.methods.removeLiquidity(new BN(toWei(inputs.tokenValue))).send({from:mywalletAddress});
      //   updateDEXui(inputs);
      // }
      // else{          
      // }
      
      alert('Contact Admin(irikefeaniboh@gmail.com) to remove liquidity for Now !');

    }
  }

  async function updateDEXui(inputs){
    
    let b = await getUpdateBal();

    // console.log(`Updated DEX ETHbalance: ${b.finalBal}`);
    // console.log(`Updated DEX DAZAbalance: ${b.tokenBal}`);   
    
        
    inputs.ethreserve.innerHTML = `${b.finalBal}`; 
    inputs.dazareserve.innerHTML = `${b.tokenBal}`;  
    inputs.dazaeth.innerHTML = `${b.price}`; 

  }

  async function getUpdateBal(){

    let _finalBal = fromWei(new BN(await web3.eth.getBalance(_dazaDex._address)).toString());
    let _tokenBal = fromWei(await dazaToken.methods.balanceOf(_dazaDex._address).call());
    let _price = fromWei(await _dazaDex.methods.dexPricing(toWei(_tokenBal), toWei(_tokenBal), toWei(_finalBal)).call())

    return {
      "finalBal" : _finalBal,
      "tokenBal": _tokenBal,
      "price":  _price
    }
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

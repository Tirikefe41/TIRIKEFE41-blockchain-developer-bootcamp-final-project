const dazaDEXca = "0xC3e6C8093657bbD3DBa8F371755815E78Ae4373a"
const dazaTokenca = "0x90227c1f2C6e2b7B19094BD69430c1599629c8D0"

const dazaDEXABI = 
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token_addr",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "myDex",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "createdLiquidity",
        "type": "uint256"
      }
    ],
    "name": "DexCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      }
    ],
    "name": "PricingParams",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "swapAmt",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "reserve",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "target",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "dbal",
        "type": "uint256"
      }
    ],
    "name": "SwaptoEth",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "_addressLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "reserveLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokens",
        "type": "uint256"
      }
    ],
    "name": "createDex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tokenReserve",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_targetToken",
        "type": "uint256"
      }
    ],
    "name": "dexPricing",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_daza",
        "type": "uint256"
      }
    ],
    "name": "DazatoETH",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ETHtoDAZA",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "addLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      }
    ],
    "name": "removeLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const dazaTokenABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

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
  // var Tx = require('ethereumjs-tx');
  var BN = web3.utils.BN;
  var toWei = web3.utils.toWei;
  var toHex = web3.utils.toHex;

  var dazaToken = new web3.eth.Contract(dazaTokenABI, dazaTokenca);
  var _dazaDex = new web3.eth.Contract(dazaDEXABI, dazaDEXca);


  const connect = document.getElementById('walletconnect');

  connect.onclick = async () => {
        
        await ethereum.request(
                    {
              method: "eth_requestAccounts"})  
        
        let mywalletAddress = ethereum.selectedAddress;
        let deployWallet = "0x2359B1dEE27500D20C3a514AD1AE0c8b4Ca7C486"
        let deployprivateKey = "aa420c33fb49f4918cbb24e8d5e28234f18bfaee6ccb520fa97700a95f6aad99"
        
        // Tracked labels...
        const walletBalance = document.getElementById('Balance1');
        const walletAddress = document.getElementById('Address1');
        const Dexstatus = document.getElementById('Dexstatus');
        
        // Scalp records...
        let balance =new BN(await web3.eth.getBalance(mywalletAddress));
        let _balance = web3.utils.fromWei(balance, 'ether');

        walletBalance.innerHTML = _balance;
        walletAddress.innerHTML = mywalletAddress;
        
        //Initialize contract window objects
        _dazaDex.setProvider(window.ethereum);
        

        // Transfer DAZA to current wallet
        
        

        let count = await web3.eth.getTransactionCount(deployWallet);
        console.log(`num transactions so far: ${count}`);

        let dazabal = await dazaToken.methods.balanceOf(deployWallet).call();
        console.log(`Deploy Balance before send: ${dazabal}`);
        
        let data = await dazaToken.methods.transfer(mywalletAddress, new BN(toWei('100', 'ether'))).send({from: deployWallet})
        console.log(`Data: ${data}`);
        // for (const [key, value] of Object.entries(data)) {
        //   console.log(`${key}: ${JSON.stringify(value)}`);
        // }

        var rawTransaction = {
                  "from": deployWallet, 
                  "gasPrice":toHex(2 * 1e9),
                  "gasLimit":toHex(210000),
                  "to": mywalletAddress,
                  // "value":new BN( web3.utils.toWei('1', 'ether')),
                  "data": data,
                  "nonce": toHex(count),
                  "chainId": toHex(5777)
                } 

        var privKey = new ethereumjs.Buffer.Buffer(deployprivateKey, 'hex');
        
        var tx = new ethereumjs.Tx(rawTransaction);

        tx.sign(privKey);
        const serializedTx = `0x${tx.serialize.toString('hex')}`;

        web3.eth.sendSignedTransaction(serializedTx, function(err, hash) {
          if (!err)
          {
              console.log('Txn Sent and hash is '+hash);
          }
          else
          {
              console.error(err);
          }
      });

  

        
        
        let dbal = await dazaToken.methods.balanceOf(mywalletAddress).call();
        console.log(`Token balance after send: ${dbal}`);
        let _dazabal = await dazaToken.methods.balanceOf(deployWallet).call();
        console.log(`Deploy Balance after send: ${_dazabal}`);
        // Object.keys(dazaToken.methods).forEach((prop)=> console.log(prop));

        // const tokenImage = 'http://placekitten.com/200/300';
        // try {
        //   // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        //   const wasAdded = await ethereum.request({
        //     method: 'wallet_watchAsset',
        //     params: {
        //       type: 'ERC20', // Initially only supports ERC20, but eventually more!
        //       options: {
        //         address: dazaToken._address, // The address that the token is at.
        //         symbol: 'DAZA', // A ticker symbol or shorthand, up to 5 chars.
        //         decimals: 18, // The number of decimals in the token.
        //         image: tokenImage, // A string url of the token logo.
        //       },
        //     },
        //   });
        
        //   if (wasAdded) {
        //     console.log('Token Added successfully!');
        //     await dazaToken.methods.approve(_dazaDex._address, toWei('200', 'ether')).send({from: mywalletAddress});
        //     await _dazaDex.methods.createDex(toWei('100', 'ether')).send({from: mywalletAddress});        

        //     Dexstatus.innerHTML = "Dex Initialized";

        //   } else {
        //     console.log('Token not added');
        //   }
        // } catch (error) {
        //   console.log(error);
        // }        
        

        // console.log(`DAZA reserveLiquidity: ${_dazaDex.methods.reserveLiquidity.call()}`)
        // Object.keys(_dazaDex.methods.reserveLiquidity.call().call()).forEach((prop)=> console.log(prop));

        
        // executing address scanning here
        // scanner.scanAddress(ethereum.selectedAddress, 1);

        // fetch('http://localhost:4107/scanner', {
        //       method: 'POST',
        //       headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       },
        //       body: JSON.stringify({address: ethereum.selectedAddress})
        //     });
      //  const tokenImage = 'http://placekitten.com/200/300';
        // try {
        //   // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        //   const wasAdded = await ethereum.request({
        //     method: 'wallet_watchAsset',
        //     params: {
        //       type: 'ERC20', // Initially only supports ERC20, but eventually more!
        //       options: {
        //         address: dazaToken._address, // The address that the token is at.
        //         symbol: 'DAZA', // A ticker symbol or shorthand, up to 5 chars.
        //         decimals: 18, // The number of decimals in the token.
        //         image: tokenImage, // A string url of the token logo.
        //       },
        //     },
        //   });
        
        //   if (wasAdded) {
        //     console.log('Token Added successfully!');
        //     await dazaToken.methods.approve(_dazaDex._address, toWei('200', 'ether')).send({from: mywalletAddress});
        //     await _dazaDex.methods.createDex(toWei('100', 'ether')).send({from: mywalletAddress});        

        //     Dexstatus.innerHTML = "Dex Initialized";

        //   } else {
        //     console.log('Token not added');
        //   }
        // } catch (error) {
        //   console.log(error);
        // }    
        // const content = await rawResponse.json();
        // console.log(content);
  }

 
window.addEventListener("load", async function () {

  function swap() {
    let inputs = {
      tokenName: document.getElementById("tokenName").value,
      tokenValue: document.getElementById("tokenAmount").value,
    };

    console.log("swap:");
    console.log(inputs.tokenName);
    console.log(inputs.tokenValue);
    console.log(_dazaDex.reserveLiquidity.call());
  }
  swap
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

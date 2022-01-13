//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract dazaDex {

  using SafeMath for uint256;
  IERC20 Daza;

  constructor(address token_addr) {
    Daza = IERC20(token_addr);
  }

  //Track total Exchange Liquidity and also Liquidity per exchange Addresses.
  uint256 public reserveLiquidity;
  mapping(address => uint256) public _addressLiquidity;


  
  // function initializes the Dex and sends some tokens to its LiquidityPool.
  function createDex(uint256 _tokens) public payable returns(uint256){
    require(reserveLiquidity == 0, "Daza already initialized with Liquidity...");
    reserveLiquidity = address(this).balance;

    _addressLiquidity[msg.sender] = reserveLiquidity;
    // Transfer Daza tokens to the Dex contract address...
    require(Daza.transferFrom(msg.sender, address(this), _tokens));
    
    return reserveLiquidity;
  }

  function dexPricing(uint256 _amount, uint256 _tokenReserve, uint256 _targetToken)
        public pure returns(uint256)
  {
    // pricing based on Hyperbolic function x*y=constant
    uint256 interimPrice = _amount.mul(_targetToken);
    uint256 taxedPrice = interimPrice.mul(997); //0.3% fees deducted.
    uint256 _base = _tokenReserve.mul(1000).add(taxedPrice);

    return taxedPrice / _base;
  }

  //
  function DazatoETH(uint256 _daza) public returns (uint256){
    uint256 dazaAvail = Daza.balanceOf(address(this));
    uint256 dazaEq = dexPricing(_daza, dazaAvail, address(this).balance);
    payable(msg.sender).transfer(dazaEq);
    require(Daza.transferFrom(msg.sender, address(this), _daza));
    return dazaEq;
  }

  function swaptoDAZA() public payable returns(uint256){
    uint256 dazaBal = Daza.balanceOf(address(this));
    uint256 ethEq = dexPricing(msg.value, address(this).balance.sub(msg.value), dazaBal);
    require(Daza.transfer(msg.sender, ethEq));

    return ethEq;
  }

  // Liquidity Provisioning...
  function addLiquidity() public payable returns (uint256){
    uint256 ethBal = address(this).balance.sub(msg.value);
    uint256 dazaBal = Daza.balanceOf(address(this));

    uint256 _dazaEq = (msg.value.mul(dazaBal)/ethBal).add(1);
    require(Daza.transferFrom(msg.sender, address(this), _dazaEq));
    // extra require to check amount is within approved token limit.


    uint256 liqCreated = msg.value.mul(reserveLiquidity)/ethBal;
    _addressLiquidity[msg.sender] += liqCreated;
     reserveLiquidity += liqCreated;

    return liqCreated;
  }


  function removeLiquidity(uint256 amt) public returns (uint256, uint256){
    uint256 _dazaBal = Daza.balanceOf(address(this));
    uint256 takeEth = amt.mul(address(this).balance) / reserveLiquidity;
    uint256 takeDaza = amt.mul(_dazaBal) / reserveLiquidity;

    _addressLiquidity[msg.sender] -= takeEth;
    reserveLiquidity -= takeEth;
    // address(this).transfer(msg.sender, takeEth);
    payable(msg.sender).transfer(takeEth);
    require(Daza.transfer(msg.sender, takeDaza));

    return (takeEth, takeDaza);
  }
}
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

  uint256 public ETHEq;

  // Add events...
  event DexCreated(address , uint256 );
  event PricingParams(uint256 );
  event SwaptoEth(uint256 ,uint256 , uint256 , uint256 , uint256 );
  // event SwaptoDaza();
  event liquidityPlus(uint256 );
  // event liquidityMinus();
  event Received(address, uint);

  //Modifier to ensure swaps are within trading balances
  // modifier checkLimit(uint256 Damt,address _address) {
  //   require(msg.sender == _address);
  //   require( Damt > Daza.balanceOf(_address));
  //   _;
  
  fallback () external payable {
    revert();
  }

  receive () external payable {
    emit Received(msg.sender, msg.value);
  }
  
  // function initializes the Dex and sends some tokens to its LiquidityPool.
  function createDex(uint256 _tokens) public payable returns(uint256){
    require(reserveLiquidity == 0, "DazaDex already initialized with Liquidity...");
    reserveLiquidity = address(this).balance;

    _addressLiquidity[msg.sender] = reserveLiquidity;
    // Transfer Daza tokens to the Dex contract address...
    require(Daza.transferFrom(msg.sender, address(this), _tokens));
    emit DexCreated(address(this), reserveLiquidity);
    
    return reserveLiquidity;
  }

  function dexPricing(uint256 _amount, uint256 _tokenReserve, uint256 _targetToken)
        public returns(uint256)
  {
    // pricing based on Hyperbolic function x*y=constant
    uint256 interimPrice = (_amount.mul(_targetToken));
    uint256 taxedPrice = interimPrice.mul(997); //0.3% fees deducted.
    uint256 _base = _tokenReserve.mul(1000*10**18).add(taxedPrice);
    emit PricingParams((taxedPrice*10**18).div(_base));

    return (taxedPrice*10**18).div(_base);
  }


  function ETHtoDAZA(uint256 _daza) public returns (uint256){
    uint256 dazaAvail = Daza.balanceOf(address(this));    
    ETHEq = dexPricing(_daza, dazaAvail, address(this).balance);
    require(dazaAvail >= _daza);
    payable(msg.sender).transfer(ETHEq);
    require(Daza.transferFrom(msg.sender, address(this), _daza));
    emit SwaptoEth(ETHEq, _daza, dazaAvail, address(this).balance, Daza.balanceOf(address(this)));
    
    return ETHEq;
  }

  function getDexed () public view returns (uint256){
    return ETHEq;
  }

  function DAZAtoETH() public payable returns(uint256){
    uint256 dazaBal = Daza.balanceOf(address(this));
    require(address(this).balance.sub(msg.value) >= msg.value);
    uint256 dazaEq = dexPricing(msg.value, address(this).balance.sub(msg.value), dazaBal);
    require(Daza.transfer(msg.sender, dazaEq));

    return dazaEq;
  }

  // Liquidity Provisioning...
  function addLiquidity() public payable returns (uint256){
    uint256 ethBal = address(this).balance.sub(msg.value);
    uint256 dazaBal = Daza.balanceOf(address(this));

    uint256 _dazaEq = (msg.value.mul(dazaBal)/ethBal).add(1);
    require(Daza.transferFrom(msg.sender, address(this), _dazaEq));
    // extra restriction to check amount is within approved token limit.


    uint256 liqCreated = msg.value.mul(reserveLiquidity)/ethBal;
    _addressLiquidity[msg.sender] += liqCreated;
    reserveLiquidity += liqCreated;

    emit liquidityPlus(liqCreated);

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
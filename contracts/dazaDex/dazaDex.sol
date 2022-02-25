//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

/// @title A mini Decentralized Exchange (DEX)
/// @author Irikefe C Aniboh
/// @notice Contract allows you explore DEX functionalities at the most basic level
/// @dev All function calls are currently implemented without side effects
contract dazaDex is Pausable {

  using SafeMath for uint256;
  address owner;
  IERC20 Daza;

  /// @notice create DEX token instance.
  /// @param token_addr ERC20 token address.
  constructor(address token_addr) {
    Daza = IERC20(token_addr);
  }

  
  /// @notice Track total Exchange Liquidity.
  /// @dev only tracks ETH liquidity.
  uint256 public reserveLiquidity;

  /// @notice Track total Exchange Liquidity and also Liquidity per exchange Addresses.
  mapping(address => uint256) public _addressLiquidity;


  uint256 public ETHEq;


  event DexCreated(address , uint256 );
  event PricingParams(uint256 );
  event SwaptoEth(uint256 ,uint256 , uint256 , uint256 , uint256 );
  event liquidityPlus(uint256 );
  event Received(address, uint);

  //Modifier to ensure swaps are within trading balances
  // modifier checkLimit(uint256 Damt,address _address) {
  //   require(msg.sender == _address);
  //   require( Damt > Daza.balanceOf(_address));
  //   _;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
}
  
  fallback () external payable {
    revert();
  }

  receive () external payable {
    emit Received(msg.sender, msg.value);
  }
  
 
  /// @notice initializes the Dex and sends some tokens to its LiquidityPool.
  /// @dev deploy contract script makes the call only once.
  /// @param _tokens Amount of native DAZA tokens to init dex with.
  /// @return the amount ETH reserve tokens sent to Contract.
  function createDex(uint256 _tokens) public payable whenNotPaused returns(uint256){
    require(reserveLiquidity == 0, "DazaDex already initialized with Liquidity...");
    owner = msg.sender;
    reserveLiquidity = address(this).balance;

    _addressLiquidity[msg.sender] = reserveLiquidity;
    // Transfer Daza tokens to the Dex contract address...
    require(Daza.transferFrom(msg.sender, address(this), _tokens));
    emit DexCreated(address(this), reserveLiquidity);
    
    return reserveLiquidity;
  }

  /// @notice prices tokens for the DEX
  /// @param _amount Amount tokens to be priced.
  /// @param _tokenReserve Reserve amount of paired token
  /// @param _targetToken Reserve amount of token to be priced
  /// @return calculated price of paired token
  function dexPricing(uint256 _amount, uint256 _tokenReserve, uint256 _targetToken)
        public whenNotPaused returns(uint256)
  {
    // pricing based on Hyperbolic function x*y=constant
    uint256 interimPrice = (_amount.mul(_targetToken));
    uint256 taxedPrice = interimPrice.mul(997); //0.3% fees deducted.
    uint256 _base = _tokenReserve.mul(1000*10**18).add(taxedPrice);
    emit PricingParams((taxedPrice*10**18).div(_base));

    return (taxedPrice*10**18).div(_base);
  }

  /// @notice Swaps DAZA to ETH
  /// @param _daza Amount tokens to be swap.
  /// @return ETH equivalent of converted DAZA amount.
  function DazatoETH(uint256 _daza) public whenNotPaused returns (uint256){
    uint256 dazaAvail = Daza.balanceOf(address(this));    
    ETHEq = dexPricing(_daza, dazaAvail, address(this).balance);
    require(dazaAvail >= _daza, "DAZA balance not enough");
    payable(msg.sender).transfer(ETHEq);
    require(Daza.transferFrom(msg.sender, address(this), _daza), "DAZA transfer not executed");
    emit SwaptoEth(ETHEq, _daza, dazaAvail, address(this).balance, Daza.balanceOf(address(this)));
    
    return ETHEq;
  }
  /// @notice Getter for ETHEq
  /// @dev was added for test purpose
  /// @return ETH equivalent of converted DAZA amount.
  function getDexed () public view returns (uint256){
    return ETHEq;
  }


  /// @notice Swaps ETH to DAZA
  /// @return DAZA equivalent of converted ETH amount.
  function ETHtoDAZA() public payable  whenNotPaused returns(uint256){
    uint256 dazaBal = Daza.balanceOf(address(this));
    require(address(this).balance.sub(msg.value) >= msg.value);
    uint256 dazaEq = dexPricing(msg.value, address(this).balance.sub(msg.value), dazaBal);
    require(Daza.transfer(msg.sender, dazaEq));

    return dazaEq;
  }

  /// @notice Adds Liquidity in ETH and DAZA to DEX
  /// @return amount of liquidity created
  function addLiquidity() public payable whenNotPaused returns (uint256){
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

  /// @notice Removes Liquidity in ETH and DAZA from DEX
  /// @dev only DEX creator can remove liquidity to avoid drain the dex of tokens
  /// @return amount of liquidity removed
  function removeLiquidity(uint256 amt) public whenNotPaused onlyOwner returns (uint256, uint256){
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
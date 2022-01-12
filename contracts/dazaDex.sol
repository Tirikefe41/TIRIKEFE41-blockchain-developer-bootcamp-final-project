//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract dazaDex {

  using SafeMath for uint256;
  IERC20 token;

  constructor(address token_addr) {
    token = IERC20(token_addr);
  }

  uint256 public _LiquidityPool;
  mapping(address => uint256) public _currLiquidity;


  function setup(uint256 tokens) public payable returns(uint256){
      
  }

}
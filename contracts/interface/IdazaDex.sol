// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

interface IdazaDex{

    function createDex(uint256 _tokens) external payable returns(uint256);

    function dexPricing(uint256 _amount, uint256 _tokenReserve, uint256 _targetToken)
        external pure returns(uint256);

    function swaptoDAZA() external  payable returns(uint256);

    function DazatoETH(uint256 _daza) external  returns (uint256);

    function addLiquidity() external  payable returns (uint256);
}
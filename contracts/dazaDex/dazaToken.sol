// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract dazaToken is ERC20 {
    constructor() ERC20("Daza", "DAZA"){
        // mint 100,000 DAZA ERC20 tokens on creation.
        _mint(_msgSender(), 100000*10**18);
    }
}

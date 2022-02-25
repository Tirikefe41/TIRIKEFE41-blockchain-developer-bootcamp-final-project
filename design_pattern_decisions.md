- Inter-Contract Execution: This interaction exists in my smart contract as our miniDEX calls the Native Token construction during initialization

- Inheritance and Interfaces: Our miniDEX utilized libraries from openzeppelin for the DEX token creation, as an interface for interacting with the token and
    also to make our contract pausable for upgrades and attacks control.

- Access Control: Our contract utilized an Owner modifying to restrict users from emptying the DEX of swap tokens

- Upgradable Contracts: Circuit breaker pattern using Pausable contract by openzeppelin was used to ensure contract execution can be paused during an emergency / upgrade / attack.
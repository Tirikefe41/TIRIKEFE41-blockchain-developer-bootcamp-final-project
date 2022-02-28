- Integer Overflow / Underflow: SafeMath library from OpenZeppelin is used to avoid integer overflow and underflow and eliminates any possibility of an arithmetic based attack.

- Contract utilizes onlyOwner modifier for liquidity removal from the DEX.

- A fallback function to revert non targeted transactions is used to track and correct DEX transactions.

- Reentrancy: Check-Effect-Interaction design pattern is used to prevent malicious transfers and withdrawals from the DEX. transfer() function is used and call() function is avoided so that we can avoid having an external untrusted entity performing a complex operation.
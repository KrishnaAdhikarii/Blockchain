# Simple Blockchain Implementation in JavaScript

This project is a basic implementation of a blockchain using JavaScript. It demonstrates how blocks are created, added to a chain, and validated for integrity.

## Features

- **Block Structure**:
  - Each block contains an `index`, `timestamp`, `data`, `previous hash (prvhash)`, and its `hash`.
  
- **Genesis Block**:
  - The first block in the chain, created at initialization.

- **Hash Calculation**:
  - A block's hash is calculated based on its properties, ensuring data integrity.

- **Blockchain Validation**:
  - Ensures the chain is valid by checking the hashes and previous block references.

- **Demonstrates Tampering**:
  - Shows how altering a block's data invalidates the entire chain.

## Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/) to run the project.
- **crypto-js**: Install the `crypto-js` package for SHA256 hashing:
  ```bash
  npm install crypto-js

## Key Learnings
- **Hashing**: How hash functions ensure data integrity.
- **Blockchain Structure**: The role of the previous block's hash in linking blocks.
- **Validation**: How tampering is detected by recalculating hashes.
## Future Improvements
- Add proof-of-work (PoW) for mining blocks.
- Introduce wallets and transactions.
- Implement a peer-to-peer network for distributed consensus.

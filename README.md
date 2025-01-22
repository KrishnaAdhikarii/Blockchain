# Blockchain Implementation with Proof of Work

## Overview
This repository contains a basic implementation of a blockchain system using JavaScript. The implementation includes features such as block creation, proof-of-work mining, transaction handling, and chain validation. The code simulates how a blockchain operates, including verifying the integrity of the chain and preventing tampering with block data.

---

## Features

1. *Genesis Block Creation*: The first block (Genesis Block) is created automatically when the blockchain is initialized.
2. *Proof of Work (Mining)*: Uses a configurable difficulty level to mine blocks by generating hashes with leading zeros.
3. *Transaction Management*: Handles pending transactions and includes mining rewards for miners.
4. *Chain Validation*: Ensures that the blockchain remains valid by verifying hashes and links between blocks.
5. *Dynamic Block Addition*: Allows new blocks to be added to the chain with custom transactions.
6. *Balance Calculation*: Tracks balances for each address based on completed transactions.
7. *Tamper Detection*: Identifies changes to block data that invalidate the chain.

---

## Code Explanation

### Transaction Class
Defines the structure of a transaction:

- *Properties*:
  - FromAddress: Address of the sender.
  - ToAddress: Address of the receiver.
  - Amount: Amount to be transferred.

### Block Class
Defines the structure and functionality of a single block:

- *Properties*:
  - timestamp: The time when the block is created.
  - transaction: List of transactions included in the block.
  - prvhash: Hash of the previous block in the chain.
  - nonce: Used for mining the block.
  - hash: Unique identifier for the block.

- *Methods*:
  - calcHash(): Calculates the hash of the block based on its properties.
  - MineBlock(difficulty): Mines the block by iterating the nonce until the hash satisfies the difficulty criteria.

### Blockchain Class
Manages the chain of blocks:

- *Properties*:
  - chain: Array of blocks in the blockchain.
  - difficulty: Difficulty level for mining new blocks.
  - pendingTransactions: List of pending transactions to be included in the next block.
  - miningReward: Reward amount for successfully mining a block.

- *Methods*:
  - createGenesisBlock(): Initializes the blockchain with a genesis block.
  - getLatestBlock(): Retrieves the last block in the chain.
  - MinePendingTransactions(MinerAddress): Mines a block containing all pending transactions and rewards the miner.
  - getBalance(address): Calculates the balance for a given address by analyzing all transactions in the chain.
  - CreateTransaction(transaction): Adds a transaction to the list of pending transactions.
  - isChainValid(): Validates the integrity of the blockchain by checking hashes and links.

---

## Usage

### Prerequisites
Ensure you have Node.js installed on your system.

### Installation
1. Clone this repository:
   bash
   git clone https://github.com/your-username/blockchain-demo.git
   cd blockchain-demo
   
2. Install dependencies (if any):
   bash
   npm install
   

### Running the Code
1. Create a new blockchain and add transactions:
   javascript
   const myChain = new Blockchain();

   myChain.CreateTransaction(new Transaction('Address1', 'Address2', 100));
   myChain.CreateTransaction(new Transaction('Address2', 'Address4', 200));
   

2. Mine pending transactions:
   javascript
   myChain.MinePendingTransactions('Krishna');
   console.log("Krishna Balance:", myChain.getBalance('Krishna'));
   console.log("Address4 Balance:", myChain.getBalance('Address4'));
   

3. Validate the blockchain:
   javascript
   console.log("Is my chain valid?", myChain.isChainValid());
   

4. View the blockchain:
   javascript
   console.log(JSON.stringify(myChain, null, 4));
   

### Output Example
- Block mining log:
  bash
  Block mined: 0000abc1234...
  Krishna Balance: 10
  Address4 Balance: 200
  
- Chain validity:
  bash
  Is my chain valid? true
  

---

## Additional Notes
- This implementation is for educational purposes and does not include advanced features like wallets or consensus algorithms.
- The mining difficulty is set to 4 but can be adjusted in the Blockchain constructor.
- The mining reward is set to 10 by default and can be changed as needed.

---

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests for improvements.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

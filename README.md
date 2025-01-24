

# Blockchain Implementation with Proof of Work

## Overview
This repository provides a basic implementation of a blockchain system using JavaScript. It demonstrates the fundamental principles of blockchain technology, including block creation, proof-of-work mining, transaction management, and chain validation. This project serves as an educational tool for understanding how blockchains work internally.

---

## Features

1. **Genesis Block Creation**: Automatically creates the first block (Genesis Block) during blockchain initialization.
2. **Proof of Work (Mining)**: Uses a configurable difficulty level to mine blocks by generating hashes with leading zeros.
3. **Transaction Management**: Handles the creation, validation, and inclusion of transactions in blocks.
4. **Chain Validation**: Ensures the blockchain's integrity by verifying the hashes and links between blocks.
5. **Dynamic Block Addition**: Supports the addition of new blocks with pending transactions.
6. **Balance Calculation**: Tracks and calculates balances for each address based on the transaction history.
7. **Tamper Detection**: Detects and flags any unauthorized changes to block data that invalidate the chain.

---

## Code Explanation

### **Transaction Class**
Defines the structure of a transaction:
- **Properties**:
  - `FromAddress`: Address of the sender.
  - `ToAddress`: Address of the receiver.
  - `Amount`: Amount to be transferred.
  - `timestamp`: Time when the transaction was created.

- **Methods**:
  - `calcHash()`: Calculates the transaction's hash based on its properties.
  - `signTransaction(signKey)`: Signs the transaction using the sender's private key.
  - `isValid()`: Validates the transaction's signature.

---

### **Block Class**
Defines the structure and functionality of a single block:
- **Properties**:
  - `timestamp`: Time when the block is created.
  - `transaction`: List of transactions included in the block.
  - `prvhash`: Hash of the previous block in the chain.
  - `nonce`: Value adjusted during mining to meet the proof-of-work condition.
  - `hash`: Unique identifier for the block.

- **Methods**:
  - `calcHash()`: Generates the hash for the block based on its properties.
  - `MineBlock(difficulty)`: Mines the block by iterating the nonce until the hash satisfies the difficulty criteria.
  - `hasValidTransaction()`: Checks the validity of all transactions in the block.

---

### **Blockchain Class**
Manages the chain of blocks:
- **Properties**:
  - `chain`: Array of blocks in the blockchain.
  - `difficulty`: Difficulty level for mining new blocks.
  - `pendingTransactions`: List of transactions awaiting inclusion in the next block.
  - `miningReward`: Reward given to miners for successfully mining a block.

- **Methods**:
  - `createGenesisBlock()`: Initializes the blockchain with a genesis block.
  - `getLatestBlock()`: Retrieves the last block in the chain.
  - `MinePendingTransactions(MinerAddress)`: Mines a new block containing all pending transactions and rewards the miner.
  - `getBalance(address)`: Calculates the balance for a given address.
  - `AddTransaction(transaction)`: Adds a transaction to the list of pending transactions.
  - `isChainValid()`: Validates the integrity of the blockchain by checking hashes and links.

---

## Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v14 or higher)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/KrishnaAdhikarii/Blockchain.git
   cd Blockchain
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### **Running the Code**
1. Create a new blockchain and add transactions:
   ```javascript
   const { Blockchain, Transaction } = require('./blockchain');

   const myChain = new Blockchain();
   myChain.AddTransaction(new Transaction('Address1', 'Address2', 100));
   myChain.AddTransaction(new Transaction('Address2', 'Address3', 50));
   ```

2. Mine pending transactions:
   ```javascript
   myChain.MinePendingTransactions('MinerAddress');
   console.log("Miner's Balance:", myChain.getBalance('MinerAddress'));
   ```

3. Validate the blockchain:
   ```javascript
   console.log("Is the blockchain valid?", myChain.isChainValid());
   ```

4. View the blockchain:
   ```javascript
   console.log(JSON.stringify(myChain, null, 4));
   ```

### **Output Example**
- Block mining log:
  ```plaintext
  Block mined successfully!
  ```
- Balances:
  ```plaintext
  Miner's Balance: 100
  Address3 Balance: 50
  ```
- Chain validity:
  ```plaintext
  Is the blockchain valid? true
  ```

---

## Additional Notes
- This implementation is for **educational purposes** and is not meant for production use.
- The mining difficulty is set to `4` but can be adjusted in the `Blockchain` class constructor.
- The mining reward is set to `100` by default and can also be configured.

---

## Contributing
Contributions are welcome! If you have suggestions for improvements, feel free to submit an issue or create a pull request.

---


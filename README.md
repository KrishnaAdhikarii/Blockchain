# Blockchain Implementation with Proof of Work

## Overview
This repository contains a basic implementation of a blockchain system using JavaScript. The implementation includes features such as block creation, proof-of-work mining, and chain validation. The code simulates how a blockchain operates, including verifying the integrity of the chain and preventing tampering with block data.

---

## Features

1. **Genesis Block Creation**: The first block (Genesis Block) is created automatically when the blockchain is initialized.
2. **Proof of Work (Mining)**: Uses a configurable difficulty level to mine blocks by generating hashes with leading zeros.
3. **Chain Validation**: Ensures that the blockchain remains valid by verifying hashes and links between blocks.
4. **Dynamic Block Addition**: Allows new blocks to be added to the chain with custom data.
5. **Tamper Detection**: Identifies changes to block data that invalidate the chain.

---

## Code Explanation

### Block Class
Defines the structure and functionality of a single block:

- **Properties**:
  - `index`: Position of the block in the chain.
  - `timestamp`: The time when the block is created.
  - `data`: Custom data for the block.
  - `prvhash`: Hash of the previous block in the chain.
  - `nonce`: Used for mining the block.
  - `hash`: Unique identifier for the block.

- **Methods**:
  - `calcHash()`: Calculates the hash of the block based on its properties.
  - `MineBlock(difficulty)`: Mines the block by iterating the nonce until the hash satisfies the difficulty criteria.

### Blockchain Class
Manages the chain of blocks:

- **Properties**:
  - `chain`: Array of blocks in the blockchain.
  - `difficulty`: Difficulty level for mining new blocks.

- **Methods**:
  - `createGenesisBlock()`: Initializes the blockchain with a genesis block.
  - `getLatestBlock()`: Retrieves the last block in the chain.
  - `addBlock(newBlock)`: Mines and appends a new block to the chain.
  - `isChainValid()`: Validates the integrity of the blockchain by checking hashes and links.

---

## Usage

### Prerequisites
Ensure you have Node.js installed on your system.

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/blockchain-demo.git
   cd blockchain-demo
   ```
2. Install dependencies (if any):
   ```bash
   npm install
   ```

### Running the Code
1. Create a new blockchain and add blocks:
   ```javascript
   const myChain = new Blockchain();
   myChain.addBlock(new Block(1, "21/01/2025", { amount: 100 }));
   myChain.addBlock(new Block(2, "22/01/2025", { amount: 200 }));
   ```

2. Validate the blockchain:
   ```javascript
   console.log("Is my chain valid?", myChain.isChainValid());
   ```

3. Tamper with the blockchain and revalidate:
   ```javascript
   myChain.chain[3].data = { amount: 10000 };
   console.log("Is my chain valid after tampering?", myChain.isChainValid());
   ```

4. View the blockchain:
   ```javascript
   console.log(JSON.stringify(myChain, null, 4));
   ```

### Output Example
- Block mining log:
  ```bash
  Block mined: 0000abc1234...
  ```
- Chain validity:
  ```bash
  Is my chain valid? true
  ```

---

## Additional Notes
- This implementation is for educational purposes and does not include advanced features like transactions, wallets, or consensus algorithms.
- The mining difficulty is set to 4 but can be adjusted in the `Blockchain` constructor.

---

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests for improvements.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.


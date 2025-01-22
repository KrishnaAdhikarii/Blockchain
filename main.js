const SHA256 = require('crypto-js/sha256');
class Transaction{
    constructor(FromAddress,ToAddress,Amount){
        this.FromAddress=FromAddress;
        this.ToAddress=ToAddress;
        this.Amount=Amount;
    }
}
class Block {
    constructor(timestamp, transaction, prvhash = '') {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.prvhash = prvhash;
        this.nonce = 0;
        this.hash = this.calcHash();
    }
    calcHash() {
        return SHA256( this.prvhash + this.timestamp + this.nonce + JSON.stringify(this.transaction)).toString();
    }
    MineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calcHash();
        }
    }

}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions=[];
        this.miningReward=10;
    }
    createGenesisBlock() {
        return new Block( "21/01/2025", "Genesis Block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    MinePendingTransactions(MinerAddress){
        let block=new Block(Date.now,this.pendingTransactions);
        block.MineBlock(this.difficulty);
        console.log("Block mined Succesfully");
        this.chain.push(block);

        this.pendingTransactions=[
            new Transaction(null,MinerAddress,this.miningReward)
        ];
        
    }

    getBalance(address){
        let balance=0;
        for (const block of this.chain){
            for(const trans of block.transaction){
                if (address==trans.FromAddress){
                    balance-=trans.Amount;
                }
                if(address==trans.ToAddress){
                    balance+=trans.Amount;
                }
            }
        }
        return balance;
    }
    CreateTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const curr = this.chain[i];
            const prv = this.chain[i - 1];

            if (curr.prvhash != prv.hash) {
                return false;
            }
            if (curr.hash != curr.calcHash()) {
                return false;
            }

        }
        return true

    }

}


// Create a new blockchain
let myChain = new Blockchain();

myChain.CreateTransaction(new Transaction('Address1','Address2',100));
myChain.CreateTransaction(new Transaction('Address2','Address4',200));

myChain.MinePendingTransactions('Krishna');

console.log("Krishna Balance:"+myChain.getBalance('Krishna'));
console.log("Address4 Balance:"+ myChain.getBalance('Address4'));
myChain.MinePendingTransactions('Krishna');

console.log("Krishna Balance:"+myChain.getBalance('Krishna'));
console.log("Address4 Balance:"+ myChain.getBalance('Address4'));

// console.log(JSON.stringify(myChain,null,4));

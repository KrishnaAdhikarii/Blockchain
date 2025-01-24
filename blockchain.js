const SHA256 = require('crypto-js/sha256');
const EC =require('elliptic').ec;
const ec=new EC('secp256k1');


class Transaction{
    constructor(FromAddress,ToAddress,Amount,timestamp){
        this.FromAddress=FromAddress;
        this.ToAddress=ToAddress;
        this.timestamp=timestamp;
        this.Amount=Amount;
    }
    calcHash(){
        return SHA256(this.FromAddress+this.ToAddress+this.Amount+this.timestamp).toString()
    }

    signTransaction(signkey){
        if(signkey.getPublic('hex')!= this.FromAddress){
            throw new Error("CAnnot Spend from other Wallets");
            
        }
        const hashTx=this.calcHash();
        const sig = signkey.sign(hashTx,'base64');
        this.signature = sig.toDER('hex');
    }
    isValid(){
        if(this.FromAddress ===null) return true;

        if(!this.signature || this.signature.length===0){
            throw new Error("No Signature")
        }
        const publickey=ec.keyFromPublic(this.FromAddress,'hex');
        return publickey.verify(this.calcHash(),this.signature);    
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
    hasValidTransaction(){
        for(tx of this.transaction){
            if(!tx.isValid()){
                return false;
            }
        }
        return true ;
    }

}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions=[];
        this.miningReward=100;
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
            new Transaction(null,MinerAddress,this.miningReward,Date.now)
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
    AddTransaction(transaction){
        if(!transaction.FromAddress || !transaction.ToAddress){
            throw new Error('Must Include From and To Address!!')
        }
        if(!transaction.isValid()){
            throw new Error('Invakid Transaction !!!')
        }

        this.pendingTransactions.push(transaction);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const curr = this.chain[i];
            const prv = this.chain[i - 1];

            if(!curr.hasValidTransaction){
                return false;
            }

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
module.exports.Blockchain=Blockchain;
module.exports.Transaction=Transaction;
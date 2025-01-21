const SHA256= require ('crypto-js/sha256');
class Block{
    constructor(index,timestamp,data,prvhash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.prvhash=prvhash;
        this.hash=this.calcHash();
    }
    calcHash(){
        return SHA256(this.index +this.prvhash+ this.timestamp+ JSON.stringify(this.data)).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0,"21/01/2025","Genesis Block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.prvhash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calcHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const curr=this.chain[i];
            const prv=this.chain[i-1];

            if (curr.prvhash!=prv.hash){
                return false;
            }
            if (curr.hash!=curr.calcHash()){
                return false;
            }
            
        }
        return true

    }

}


// Create a new blockchain
let myChain = new Blockchain();

// Add 7 blocks to the blockchain
myChain.addBlock(new Block(1, "21/01/2025", { amount: 100 }));
myChain.addBlock(new Block(2, "22/01/2025", { amount: 200 }));
myChain.addBlock(new Block(3, "23/01/2025", { amount: 300 }));
myChain.addBlock(new Block(4, "24/01/2025", { amount: 400 }));
myChain.addBlock(new Block(5, "25/01/2025", { amount: 500 }));
myChain.addBlock(new Block(6, "26/01/2025", { amount: 600 }));
myChain.addBlock(new Block(7, "27/01/2025", { amount: 700 }));

// Log the validity of the chain before any tampering
console.log("Is my chain valid? " + myChain.isChainValid()); // Expected: true

// Tamper with the blockchain by modifying the data of a block
myChain.chain[3].data = { amount: 10000 };

// Log the validity of the chain after tampering
console.log("Is my chain valid after tampering? " + myChain.isChainValid()); // Expected: false

// Optionally, log the entire blockchain for inspection
console.log(JSON.stringify(myChain, null, 4));
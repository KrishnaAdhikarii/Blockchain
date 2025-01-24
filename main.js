const {Blockchain,Transaction}= require('./blockchain');
const EC =require('elliptic').ec;
const ec=new EC('secp256k1');


// Create a new blockchain
let mykey=ec.keyFromPrivate('a84c3fa674eee356fae650195bb9b64f16a98bfdfcdab45a79721518f3d27a73');
mywalletAddress=mykey.getPublic('hex');

let myChain = new Blockchain();
const tx1 =new Transaction(mywalletAddress,'Address2',10,Date.now);
tx1.signTransaction(mykey);
myChain.AddTransaction(tx1);




myChain.MinePendingTransactions(mywalletAddress);
myChain.MinePendingTransactions(mywalletAddress);


console.log("Krishna Balance:"+myChain.getBalance(mywalletAddress));


// console.log(JSON.stringify(myChain,null,4));

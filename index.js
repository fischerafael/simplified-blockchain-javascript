const Blockchain = require("./src/BlockChain");

const blockChain = new Blockchain();
console.log(blockChain);
console.log(blockChain.addBlock({ amount: 10 }));
console.log(blockChain);

const sha256Hash = require("crypto-js/sha256");

class Block {
  constructor(index = 0, previousHash = null, data = "Genesis") {
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = new Date();
    this.hash = this.generateHash();
  }

  generateHash() {
    const previousHash = this.previousHash;
    const index = this.index;
    const data = this.data;
    const timestamp = this.timestamp;
    const toBeHashed = previousHash + index + data + timestamp;
    return sha256Hash(toBeHashed).toString();
  }
}

class BlockChain {
  constructor() {
    this.blocks = [new Block()];
    this.index = 1;
  }

  getLatestBlock() {
    return this.blocks.pop();
  }

  increaseIndex() {
    this.index++;
  }

  addBlock(data) {
    const index = this.index;
    const previousHash = this.getLatestBlock().hash;

    const block = new Block(index, previousHash, data);
    this.increaseIndex();
    this.blocks.push(block);
  }
}

const block = new Block(0, null, "Genesis");
const blockChain = new BlockChain(block);
console.log(blockChain);

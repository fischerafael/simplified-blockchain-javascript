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

  validateChain() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      // Check if the current block's hash is correct
      if (currentBlock.hash !== currentBlock.generateHash()) {
        return false;
      }

      // Check if the current block's previous hash is correct
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  addBlock(data) {
    const index = this.index;
    const previousHash = this.getLatestBlock().hash;

    const block = new Block(index, previousHash, data);
    this.increaseIndex();
    this.blocks.push(block);
  }

  countBlocks() {
    return this.blocks.length;
  }
}

const blockChain = new BlockChain();

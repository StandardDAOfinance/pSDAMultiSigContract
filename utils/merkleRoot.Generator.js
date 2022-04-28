const { MerkleTree } = require("merkletreejs")
const keccak256 = require("keccak256")
const WHITELIST = [
  "0x2155BCeA4f362D5D9CE67817b826A8F31b61D0BF",
  "0xd06731C23C5B711Fea00820dDBE70F089BAA35aA",
]

console.log(WHITELIST)
const leaves = WHITELIST.map((addr) => keccak256(addr))

// Create tree
const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
const rootHash = `0x${merkleTree.getRoot().toString("hex")}`
console.log(rootHash)

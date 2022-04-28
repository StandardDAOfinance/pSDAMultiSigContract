const hre = require("hardhat")
const { BigNumber } = require("ethers")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log("Deployer address:", deployer.address)
  console.log("Deployer balance:", (await deployer.getBalance()).toString())

  const PSDAPresale = await hre.ethers.getContractFactory("PSDAPresale")
  const pSDAPresale = await PSDAPresale.deploy(
    "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    "0x2155bcea4f362d5d9ce67817b826a8f31b61d0bf",
    BigNumber.from("1651190400").toBigInt(),
    BigNumber.from("1000000").toBigInt(),
    BigNumber.from("3500000").toBigInt()
  )
  console.log("Transaction Hash:", pSDAPresale.deployTransaction.hash)
  await pSDAPresale.deployed()
  console.log("Contract Address:", pSDAPresale.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

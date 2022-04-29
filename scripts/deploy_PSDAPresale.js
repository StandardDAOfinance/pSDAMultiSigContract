const hre = require("hardhat")
const { BigNumber } = require("ethers")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log("Deployer address:", deployer.address)
  console.log("Deployer balance:", (await deployer.getBalance()).toString())

  const PSDAPresale = await hre.ethers.getContractFactory("PSDAPresale")
  const pSDAPresale = await PSDAPresale.deploy(
    "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa", // DAI token address : mainnet dai: 0x6B175474E89094C44Da98b954EedeAC495271d0F,  kovan dai: 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa
    "0x2155bcea4f362d5d9ce67817b826a8f31b61d0bf", // Multi Sig Address: 0x6693002C49AF6d485517A443650AB76B88298fE1
    BigNumber.from("1651190400").toBigInt(), // Starting Time
    BigNumber.from("1000000" + "000000000000000000").toBigInt(), // Max Dai Amount Per a Investor
    BigNumber.from("3500000" + "000000000000000000").toBigInt() // Max Expected Amount Of DAI
  )
  console.log("Transaction Hash:", pSDAPresale.deployTransaction.hash)
  await pSDAPresale.deployed()
  console.log("Contract Address:", pSDAPresale.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

const { BigNumber } = require("ethers")

module.exports = [
  "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI token address : mainnet dai: 0x6B175474E89094C44Da98b954EedeAC495271d0F,  kovan dai: 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa
  "0x6693002C49AF6d485517A443650AB76B88298fE1", // Multi Sig Address: 0x6693002C49AF6d485517A443650AB76B88298fE1
  BigNumber.from("1651190400").toBigInt(), // Starting Time
  BigNumber.from("1000000" + "000000000000000000").toBigInt(), // Max Dai Amount Per a Investor
  BigNumber.from("3500000" + "000000000000000000").toBigInt(), // Max Expected Amount Of DAI
  BigNumber.from("483000" + "000000000000000000").toBigInt(), // Sold Amount Of DAI
]

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
// import fs from 'fs';
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: import.meta.env.VITE_ALCHEMY_API_KEY,
      accounts: ["2b01d44b69d1d35083db2d0daab95c8d5c1dbb2a254f6ffcf81f261e4d963630"]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
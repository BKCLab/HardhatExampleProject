require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/0820cffd00564674ae96bb78e3578f02",
      accounts: ["d5485c1600de8fb0cc32689e28efeba643cfb88dabc2219ba6199ff5a035dfd3"]
    }
  }
};

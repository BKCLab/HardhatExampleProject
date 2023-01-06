const hre = require("hardhat");
const { ethers } = hre;

const BachKhoaToken =
  require("../artifacts/contracts/v2/BachKhoaToken.sol/BachKhoaToken.json").abi;
const BachKhoaAsset =
  require("../artifacts/contracts/v2/BachKhoaAsset.sol/BachKhoaAsset.json").abi;
const MySwap = require("../artifacts/contracts/v2/MySwap.sol/MySwap.json").abi;

const ERC20Address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const ERC721Address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const SwapAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

async function mintForSwap(swapContract, amount) {
  const bachKhoaAsset = new ethers.Contract(
    ERC721Address,
    BachKhoaAsset,
    await ethers.getSigner(
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    )
  );
  const response = await bachKhoaAsset.mintBatch(swapContract, amount);
  const receipt = await response.wait();

  console.log(receipt);
}
// mintForSwap(SwapAddress, 100);

async function approveForMySwap(swapContract, amount) {
    const bachKhoaToken = new ethers.Contract(
        ERC20Address,
        BachKhoaToken,
        await ethers.getSigner(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        )
      );
      const response = await bachKhoaToken.approve(swapContract, amount);
      const receipt = await response.wait();
    
      console.log(receipt);
}

// approveForMySwap(SwapAddress, 5)

async function buy(tokenId) {
    const mySwap = new ethers.Contract(
        SwapAddress,
        MySwap,
        await ethers.getSigner(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        )
      );
      const response = await mySwap.swap(tokenId);
      const receipt = await response.wait();
    
      console.log(receipt);
}

// buy(1)

async function withdraw() {
    const mySwap = new ethers.Contract(
        SwapAddress,
        MySwap,
        await ethers.getSigner(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        )
      );
      const response = await mySwap.withdraw();
      const receipt = await response.wait();
    
      console.log(receipt);
}

// withdraw()
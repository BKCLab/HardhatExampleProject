const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("ERC20", function () {
    async function deployment() {
        const BachKhoaToken = await ethers.getContractFactory("BachKhoaToken")
        const bachKhoaToken = await BachKhoaToken.deploy("Bach Khoa Token", "BKT", 1000)
        await bachKhoaToken.deployed()
        const accounts = await ethers.getSigners()

        return {bachKhoaToken, accounts}
    }

    describe("Deployment", function () {
        it("should have right info", async function () {
            const { bachKhoaToken, accounts } = await loadFixture(deployment);
            await expect(await bachKhoaToken.name()).to.equal("Bach Khoa Token")
            await expect(await bachKhoaToken.symbol()).to.equal("BKT")
        })
    })

    describe("Transfer", function () {
        it("should transfer value", async function () {
            const { bachKhoaToken, accounts } = await loadFixture(deployment);
            await expect(await bachKhoaToken.transfer(accounts[1].address, 100)).to.emit(bachKhoaToken, "Transfer").withArgs(accounts[0].address, accounts[1].address, 100)
            await expect(await bachKhoaToken.transfer(accounts[1].address, 100)).to.changeTokenBalances(bachKhoaToken, [accounts[0].address, accounts[1].address], [-100, 100])
        })

        it("should reverts", async function () {
            const { bachKhoaToken, accounts } = await loadFixture(deployment);
            await expect(bachKhoaToken.connect(accounts[1]).transfer(accounts[2].address, 1)).to.be.revertedWith("balance is not enough")
        })
    })
})
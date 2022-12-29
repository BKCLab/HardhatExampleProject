// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MySwap is Ownable {
    mapping(uint256 => bool) sold;
    address private _erc20;
    address private _erc721;
    uint256 private _price;

    constructor(
        address erc20,
        address erc721,
        uint256 price
    ) {
        _erc20 = erc20;
        _erc721 = erc721;
        _price = price;
    }

    function setPrice(uint256 newPrice) external onlyOwner {
        _price = newPrice;
    }

    function withdraw() external onlyOwner {
        IERC20 erc20Contract = IERC20(_erc20);
        uint256 balance = erc20Contract.balanceOf(address(this));
        erc20Contract.transfer(msg.sender, balance);
    }

    function swap(uint256 tokenId) public returns (bool) {
        require(!sold[tokenId], "0x52");
        require(
            IERC20(_erc20).transferFrom(msg.sender, address(this), _price),
            "0x50"
        );
        IERC721(_erc721).safeTransferFrom(address(this), msg.sender, tokenId);
        sold[tokenId] = true;
        return true;
    }
}

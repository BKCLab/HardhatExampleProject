// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BachKhoaAsset is ERC721, ERC721URIStorage, Ownable {
    bool private minted;

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {}

    function mintBatch(address swapContractAddress, uint256 amount)
        external
        onlyOwner
    {
        require(!minted, "Can mint only once");
        for (uint256 i = 1; i <= amount; i++) {
            _mint(swapContractAddress, i);
        }
        minted = true;
    }

    function setTokenURI(uint256 tokenId_, string memory tokenURI_)
        external
        onlyOwner
    {
        _setTokenURI(tokenId_, tokenURI_);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721, ERC721URIStorage)
    {
        ERC721URIStorage._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return ERC721URIStorage.tokenURI(tokenId);
    }
}

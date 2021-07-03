// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/Ownable.sol";
import "./interfaces/SafeMath.sol";

contract ExternalOracle {
    function getRelativePrice(address _tokenAddress)
        public
        view
        returns (uint256)
    {
        return 1;
    }

    function getPriceETH() public view returns (uint256) {
        return 1;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/Ownable.sol";
import "./interfaces/SafeMath.sol";
import "./ExternalOracle.sol";

contract ExchangeOracle is Ownable {
    // **************************************** DEV VOTE ***************************************
    /**
     * @dev Struct saves information on dev's current vote and status. False denotes that dev
     * wont be included in total tally for votes and vote wont count towards any change
     * @notice Activating a dev's status can only occur under dev vote
     */
    struct Dev {
        bool active;
        bool vote;
    }
    /**
     * @dev Mapping key value address (developer) returns Dev struct information for dev
     */
    mapping(address => Dev) public devBook;

    /**
     * @dev Array used to access the address of all developers on Cobalt
     */
    address[] public devArray;

    /**
     * @dev Mapping key value address (Contract address) returns a bool on contract entry
     * status. True - valid entry, False - not permitted.
     */
    mapping(address => bool) contractSupported;

    /**
     * @dev List all variables proposed for changes.
     */
    address addressProposed;
    string proposedChange;
    uint256 intProposed;
    uint256 intProposed2;
    uint256 intProposed3;
    uint256 intProposed4;
    uint256 intProposed5;
    uint256 intProposed6;
    bool boolProposed;

    /**
     * @dev Modifier limits the entry of contracts interacting with the dev panel.
     */
    modifier validEntry {
        bool cleared;
        require(
            contractSupported[msg.sender] == true,
            "This contract cant interact with the dev panel"
        );
        _;
    }

    /**
     * @dev Modifier limits the entry of user addresses interacting with the dev panel.
     */
    modifier onlyDev {
        bool cleared;

        for (uint256 i = 0; i < devArray.length; i++) {
            if (msg.sender == devArray[i]) {
                cleared = true;
            }
        }

        require(cleared == true, "Caller needs to be a dev");
        _;
    }

    /**
     * @dev Function takes a set percentage and string set by the contract making the call
     * with information on percentage needed for change to occur and string of the calling
     * function. Reverts if percentage is not met or calling function was does not coincide
     * with the one agreed for the change.
     * @param _percentage percent needed for change to be approved.
     * @param _callingFunctionChange string of asking for clearance
     * @notice On successful run, function also resets all dev votes to false
     */
    function clearedAction(
        uint256 _percentage,
        string memory _callingFunctionChange
    ) public {
        uint256 votes;
        uint256 totalVotes;
        uint256 votePercentage;

        for (uint256 i = 0; i < devArray.length; i++) {
            if (
                devBook[devArray[i]].vote == true &&
                devBook[devArray[i]].active == true
            ) {
                votes++;
            }
            if (devBook[devArray[i]].active == true) {
                totalVotes++;
            }
        }

        votePercentage = SafeMath.multiply(votes, 100, totalVotes);
        require(votePercentage >= _percentage);
        require(
            keccak256(abi.encodePacked(proposedChange)) ==
                keccak256(abi.encodePacked(_callingFunctionChange))
        );

        for (uint256 i = 0; i < devArray.length; i++) {
            devBook[devArray[i]].vote = false;
        }
    }

    /**
     * @dev Function accepts a proposed address for a new dev addition. This dev gets added
     * to the dev array as well as turned as active as default.
     */
    function acceptDev() public onlyDev {
        address newDev = addressChange(80, "acceptDev");
        devArray.push(newDev);
        devBook[newDev].active = true;
    }

    /**
     * @dev Function deactivates the active status for a developer.
     */
    function deleteDev() public onlyDev {
        address status = addressChange(80, "deleteDev");
        devBook[status].active = false;
    }

    /**
     * @dev Function activates a new contract address as entry point.
     */
    function acceptContract() public onlyDev {
        clearedAction(80, "acceptContract");
        contractSupported[addressProposed] = true;
    }

    /**
     * @dev Function deactivates an existing contract address as entry point.
     */
    function deleteContract() public onlyDev {
        clearedAction(80, "deleteContract");
        contractSupported[addressProposed] = false;
    }

    /**
     * @dev Function stores the dev's vote for the current proposed change.
     * @notice We dont limit vote to only active devs as their votes dont get added
     * to the total tally during clearedAction function.
     */
    function vote() public onlyDev {
        devBook[msg.sender].vote = true;
    }

    /**
     * @dev Resets all the dev contract votes to false and takes a parameter bool as
     * the new proposed change. The string of the function accepting this change must also
     * be parsed in.
     * @param _bool proposed change on function output
     * @param _proposedChange string cointaining information on permitted function accessing
     * the boolChange function.
     */
    function proposeBoolChange(bool _bool, string memory _proposedChange)
        public
        onlyDev
    {
        for (uint256 i = 0; i < devArray.length; i++) {
            devBook[devArray[i]].vote = false;
        }
        boolProposed = _bool;
        proposedChange = _proposedChange;
    }

    /**
     * @dev Function outputs the current bool proposed as function output to a valid
     * entry contract. The contract will also specify its own name to limit changes
     * on other functions and increase security.
     * @param _percent percent needed for change to be approved.
     * @param _proposedChange string of the calling function.
     * @return new bool value proposed
     */
    function boolChange(uint256 _percent, string memory _proposedChange)
        public
        validEntry
        returns (bool)
    {
        clearedAction(_percent, _proposedChange);

        return (boolProposed);
    }

    /**
     * @dev Resets all the dev contract votes to false and takes a parameter uint as
     * the new proposed change. The string of the function accepting this change must also
     * be parsed in.
     * @param _num proposed change on function output
     * @param _proposedChange string cointaining information on permitted function accessing
     * the numChange function.
     */
    function proposeNumberChange(uint256 _num, string memory _proposedChange)
        public
        onlyDev
    {
        for (uint256 i = 0; i < devArray.length; i++) {
            devBook[devArray[i]].vote = false;
        }
        intProposed = _num;
        proposedChange = _proposedChange;
    }

    /**
     * @dev Function outputs the current uint proposed as function output to a valid
     * entry contract. The contract will also specify its own name to limit changes
     * on other functions and increase security.
     * @param _percent percent needed for change to be approved.
     * @param _proposedChange string of the calling function.
     * @return new uint value proposed
     */
    function numberChange(uint256 _percent, string memory _proposedChange)
        public
        validEntry
        returns (uint256)
    {
        clearedAction(_percent, _proposedChange);

        return (intProposed);
    }

    /**
     * @dev Resets all the dev contract votes to false and takes a parameter address as
     * the new proposed change. The string of the function accepting this change must also
     * be parsed in.
     * @param _address proposed change on function output
     * @param _proposedChange string cointaining information on permitted function accessing
     * the addressChange function.
     */
    function proposeAddressChange(
        address _address,
        string memory _proposedChange
    ) public onlyDev {
        for (uint256 i = 0; i < devArray.length; i++) {
            devBook[devArray[i]].vote = false;
        }

        addressProposed = _address;
        proposedChange = _proposedChange;
    }

    /**
     * @dev Function outputs the current address proposed as function output to a valid
     * entry contract. The contract will also specify its own name to limit changes
     * on other functions and increase security.
     * @param _percent percent needed for change to be approved.
     * @param _proposedChange string of the calling function.
     * @return new address value proposed
     */
    function addressChange(uint256 _percent, string memory _proposedChange)
        public
        validEntry
        returns (address)
    {
        clearedAction(_percent, _proposedChange);

        return addressProposed;
    }

    /**
     * @dev Resets all the dev contract votes to false and takes multiple params as
     * the new tier proposed. The string of the function accepting this change must also
     * be parsed in.
     */
    function proposeTierChange(
        uint256 _amountTier,
        uint256 _timeTier,
        uint256 _interest,
        uint256 _amountStakersLeft,
        uint256 _tierDuration,
        string memory _proposedChange
    ) public {
        for (uint256 i = 0; i < devArray.length; i++) {
            devBook[devArray[i]].vote = false;
        }
        intProposed = _amountTier;
        intProposed2 = _timeTier;
        intProposed3 = _interest;
        intProposed4 = _amountStakersLeft;
        intProposed5 = _tierDuration;

        proposedChange = _proposedChange;
    }

    /**
     * @dev Function outputs the current selection proposed as function output to a valid
     * entry contract. The contract will also specify its own name to limit changes
     * on other functions and increase security.
     */
    function tierChange(uint256 _percent, string memory _proposedChange)
        public
        validEntry
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        clearedAction(_percent, _proposedChange);

        return (
            intProposed,
            intProposed2,
            intProposed3,
            intProposed4,
            intProposed5
        );
    }

    function isDev(address _caller) public view returns (bool) {
        return devBook[_caller].active;
    }

    /**
     * @dev Resets all the dev contract votes to false and takes a parameter value, status and
     * address of the token. The string of the function accepting this change must also
     * be parsed in.
     * @param  _value new proposed value for token
     * @param  _status new status of token support
     * @param  _tokenAddress address of token being updated
     * @param _proposedChange string cointaining information on permitted function accessing
     * the boolChange function.
     */
    function proposeTokenChange(
        uint256 _value,
        bool _status,
        address _tokenAddress,
        string memory _proposedChange
    ) public onlyDev {
        for (uint256 i = 0; i < devArray.length; i++) {
            devBook[devArray[i]].vote = false;
        }
        intProposed = _value;
        boolProposed = _status;
        addressProposed = _tokenAddress;
        proposedChange = _proposedChange;
    }

    /**
     * @dev Function takes proposed variable values to update token information.
     */
    function tokenChange() public onlyDev {
        clearedAction(50, "updateToken");
        tokenData[addressProposed] = Token(intProposed, boolProposed);
    }

    /**
     * @dev Function takes a proposed uint value to update ethereum current price in USD.
     */
    function priceChangeETH() public onlyDev {
        clearedAction(50, "updateETH");
        USDpriceETH = intProposed;
    }

    /**
     * @dev Function takes a proposed address value to update the external oracle.
     */
    function externalOracleChange() public onlyDev {
        clearedAction(50, "updateETH");
        oracle = ExternalOracle(addressProposed);
    }

    constructor() {
        tokenData[0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE] = Token(
            1000000000000000000,
            true
        );
        // rinkeby weth address to work with uniswap
        tokenData[0xc778417E063141139Fce010982780140Aa0cD5Ab] = Token(
            53000000000000,
            true
        );
        tokenData[0x433C6E3D2def6E1fb414cf9448724EFB0399b698] = Token(
            53000000000000,
            true
        );
        devArray = [
            0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
            0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
        ];
        devBook[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4].active = true;
        devBook[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].active = true;
        USDpriceETH = 200000;
    }

    // ******************************** Token Data **********************************
    /**
     * @dev Struct saves information token data. Value field contains data on token
     * value relative to ethereum. Active field displays current support for token.
     * @notice Unsupported tokens use an external oracle to output relative value of eth
     * from other sources.
     */
    struct Token {
        uint256 value;
        bool active;
    }

    /**
     * @dev External oracle instance to provides information on token relative value using
     * other platforms.
     */
    ExternalOracle oracle;

    /**
     * @dev uint saves the value of Ethereum in USD.
     * @notice Decimals were shifted to the right for more accurate readings on current
     * prices of Ethereum in USD.
     */
    uint256 public USDpriceETH;

    /**
     * @dev Mapping key value of address (token address) returns the struct with pertaining information
     * on token support and value.
     */
    mapping(address => Token) tokenData; // Token information accessed by token address

    /**
     * @dev Function returns relative price of two tokens.
     * @notice Fuction checks for token support, if token is not supported,
     * the contract will delegate the task to the outer oracle to pull
     * prices from other sources.
     * @param _sellTokenAddress address of queried selling token
     * @param _buyTokenAddress address of queried token being bought
     * @return relative value of token being sold, relative value of token
     * being bought.
     */
    function priceOfPair(address _sellTokenAddress, address _buyTokenAddress)
        public
        view
        returns (uint256, uint256)
    {
        uint256 sellTokenPrice;
        uint256 buyTokenPrice;

        if (tokenData[_sellTokenAddress].active) {
            sellTokenPrice = tokenData[_sellTokenAddress].value;
        } else {
            sellTokenPrice = oracle.getRelativePrice(_sellTokenAddress);
        }

        if (tokenData[_buyTokenAddress].active) {
            buyTokenPrice = tokenData[_buyTokenAddress].value;
        } else {
            buyTokenPrice = oracle.getRelativePrice(_buyTokenAddress);
        }

        return (sellTokenPrice, buyTokenPrice);
    }

    /**
     * @dev Function returns the price of Ethereum in USD
     * @return price of ETH in USD
     */
    function priceOfETH() public view returns (uint256) {
        return (USDpriceETH);
    }

    /**
     * @dev Function returns the value of the queried token.
     * @param _tokenAddress of token query
     * @notice Fuction checks for token support, if token is not supported,
     * the contract will delegate the task to the outer oracle to pull
     * prices from other sources.
     */
    function priceOfToken(address _tokenAddress) public view returns (uint256) {
        if (tokenData[_tokenAddress].active) {
            return tokenData[_tokenAddress].value;
        } else {
            return oracle.getRelativePrice(_tokenAddress);
        }
    }
}

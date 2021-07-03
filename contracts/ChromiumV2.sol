// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/UniversalERC20.sol";
import "./interfaces/Ownable.sol";
import "./interfaces/IUniswap.sol";
import "./ExchangeOracle.sol";

contract ChromiumV2 {
    using UniversalERC20 for IERC20;

    event Received(address, uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);

    // ********************************** CONTRACT CONTROL *********************************

    /**
     * @dev ERC20 storing instance of main token (CBLT).
     */
    IERC20 public token;

    /**
     * @dev Cobalt oracle contract.
     */
    ExchangeOracle public oracle;

    /**
     * @dev Total contract balance of available ETH for swapping.
     */
    uint256 public contractBalance;

    /**
     * @dev Exchange status. True - On / False - Off
     */
    bool public chromiumStatus;

    /**
     * @dev Bool enables the sellCBLT function. True - On / False - Off
     */
    bool public buyStatus;

    /**
     * @dev Modifier restricts access to only devs.
     */
    modifier isDev() {
        require(oracle.isDev(msg.sender) == true, "User is not a developer");
        _;
    }

    /**
     * @dev Setter function changes the address of the default token
     * exchange uses to swap.
     */
    function setToken() public isDev {
        address newToken = oracle.addressChange(51, "setToken");
        token = IERC20(newToken);
    }

    /**
     * @dev Getter function used to pull total available ETH for swapping.
     */
    function getContractBalance() public view returns (uint256) {
        return contractBalance;
    }

    /**
     * @dev Setter function changes the address of the default oracle
     * from which contract pulls prices.
     */
    function setOracle() public isDev {
        address newOracle = oracle.addressChange(51, "setOracle");
        oracle = ExchangeOracle(newOracle);
    }

    /**
     * @dev Function returns the current status for chromium status. True - on,
     * False - off.
     */
    function setChromiumStatus() public isDev {
        bool status = oracle.boolChange(51, "setChromiumStatus");
        chromiumStatus = status;
    }

    /**
     * @dev Function changes chromium status.
     */
    function setBuyStatus() public isDev {
        bool status = oracle.boolChange(51, "setBuyStatus");
        buyStatus = status;
    }

    function getEtherBalance() public view returns (uint256) {
        return address(this).balance;
    }

    constructor(address _oracleAddress) {
        token = IERC20(address(0x29a99c126596c0Dc96b02A88a9EAab44EcCf511e));
        oracle = ExchangeOracle(_oracleAddress);
        chromiumStatus = true;
        buyStatus = false;
        feeThreshold = 5e18;
        poolThreshold = 200000000000000000000000;
        flatFee = 3;
        percentFee = 3;
    }

    /**
     * @dev Receiver keeps track of all funds directly sent to contract
     * and adds it to total ETH pool available for swapping.
     */
    receive() external payable {
        contractBalance = SafeMath.add(contractBalance, msg.value);
        emit Received(msg.sender, msg.value);
    }

    // ************************************ EXCHANGE ******************************************

    /**
     * @dev uint used to determine to determine fee and pool from which the
     * users request to swap will be funded.
     */
    uint256 public poolThreshold;

    /**
     * @dev uint keeps track of current balance available for high value
     * transactions.
     */
    uint256 public highTokenPool;

    /**
     * @dev uint keeps track of current balance available for low value
     * transactions.
     */
    uint256 public lowTokenPool;

    /**
     * @dev Function returns the balance of each pool.
     */
    function getPoolBalance(uint256 _poolNum) public view returns (uint256) {
        if (_poolNum == 1) {
            return highTokenPool;
        } else {
            return lowTokenPool;
        }
    }

    /**
     * @dev Function sets the threshold to determine fee and pool access.
     */
    function setThreshold() public {
        uint256 newLimit = oracle.numberChange(51, "setThreshold");
        poolThreshold = SafeMath.mul(newLimit, 1e18);
    }

    /**
     * @dev Function used to send CBLT to contract. Function takes a param of
     * uint to determine to which pool balance will be added as well as
     * the amount sent.
     * @param _poolType Type 1 funds high pool, type 2 funds low pool.
     * @param _amount Amount being sent to the contract.
     */
    function fundTokenPool(uint256 _poolType, uint256 _amount) public {
        if (_poolType == 1) {
            IERC20(token).universalTransferFromSenderToThis(_amount);
            highTokenPool = SafeMath.add(highTokenPool, _amount);
        } else if (_poolType == 2) {
            IERC20(token).universalTransferFromSenderToThis(_amount);
            lowTokenPool = SafeMath.add(lowTokenPool, _amount);
        }
    }

    /**
     * @dev Modifier determines if swapping is valid. Value must be higher than
     * 0.015 ETH and chromium status should be turned on.
     */
    modifier validBuy() {
        require(
            msg.value >= 15e15,
            "Error, deposit must be higher than 0.015 ETH"
        );
        require(
            chromiumStatus == true,
            "Exchange is currently offline, please try again later."
        );
        _;
    }

    /**
     * @dev Modifier checks if chromium is currently supporting swapping in both
     * directions (buy and sell).
     */
    modifier validSell() {
        require(
            chromiumStatus == true,
            "Exchange is currently offline, please try again later."
        );
        require(buyStatus == true, "Buying feature is currently offline");

        _;
    }

    /**
     * @dev Function outputs information on a simulated transaction based on
     * an amount of ETH sent.
     * @param _amount of ether sent to buy CBLT tokens
     * @return amount of expected tokens user should receive on ETH sent,
     * new balance after fee has been subtracted, and the substracted fee.
     */
    function expectedBuyReturn(uint256 _amount)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        uint256 priceOfToken = oracle.priceOfToken(address(token));
        uint256 balance;
        uint256 tokenExpectedReturn;
        uint256 fee;

        (balance, fee) = calculateFee(_amount);
        tokenExpectedReturn = SafeMath.mul(
            1e18,
            SafeMath.div(balance, priceOfToken)
        );
        return (tokenExpectedReturn, balance, fee);
    }

    /**
     * @dev Function outputs information on a simulated transaction based on
     * an amount of CBLT sent.
     * @param _amount of CBLT tokens sent to swap for ETH
     * @return new balance after fee has been subtracted, and the substracted
     * fee.
     */
    function expectedSellReturn(uint256 _amount)
        public
        view
        returns (uint256, uint256)
    {
        uint256 priceOfToken;
        uint256 balance;
        uint256 fee;

        priceOfToken = oracle.priceOfToken(address(token));
        (balance, fee) = calculateFee(SafeMath.mul(_amount, priceOfToken));
        return (balance, fee);
    }

    /**
     * @dev Helper function calculates a fee based on the amount of ETH
     * user sent or should be sent.
     * @param _amount of ETH sent or received
     * @return new balance after fee is subtracted, fee subtracted
     */
    function calculateFee(uint256 _amount)
        public
        view
        returns (uint256, uint256)
    {
        uint256 newBalance;
        uint256 fee;

        if (_amount > feeThreshold) {
            fee = SafeMath.multiply(_amount, percentFee, 1000);
            newBalance = SafeMath.sub(_amount, fee);
        } else {
            uint256 ETHprice = oracle.priceOfETH();
            uint256 ETHinUSD = SafeMath.div(100000000000000000000, ETHprice);
            fee = SafeMath.mul(ETHinUSD, flatFee);
            newBalance = SafeMath.sub(_amount, fee);
        }

        return (newBalance, fee);
    }

    /**
     * @dev Function sends an amount of CBLT tokens to user based
     * on amount sent by user.
     */
    function buyCBLT() public payable validBuy {
        uint256 tokensOwed;
        uint256 newBalance;
        uint256 fee;

        (tokensOwed, newBalance, fee) = expectedBuyReturn(msg.value);

        if (tokensOwed >= poolThreshold) {
            require(
                tokensOwed < highTokenPool,
                "Pool is currently depleted for the amount promised."
            );
            highTokenPool = SafeMath.sub(highTokenPool, tokensOwed);
        } else {
            require(
                tokensOwed < lowTokenPool,
                "Pool is currently depleted for the amount promised."
            );
            lowTokenPool = SafeMath.sub(lowTokenPool, tokensOwed);
        }

        totalFeeBalance = SafeMath.add(totalFeeBalance, fee);
        contractBalance = SafeMath.add(contractBalance, newBalance);
        IERC20(token).universalTransfer(msg.sender, tokensOwed);
    }

    /**
     * @dev Function accepts a receiving amount of CBLT from user and
     * sends the amount of ETH equivalent in value back.
     * @notice Amount of ETH sent is first subtracted a fee.
     */
    function sellCBLT(uint256 _amount) public payable validSell {
        uint256 newBalance;
        uint256 fee;

        (newBalance, fee) = expectedSellReturn(_amount);
        require(
            newBalance < contractBalance,
            "Expected ETH return is higher than contract's balance."
        );

        totalFeeBalance = SafeMath.add(totalFeeBalance, fee);
        contractBalance = SafeMath.sub(contractBalance, newBalance);

        IERC20(token).universalTransferFromSenderToThis(
            SafeMath.mul(_amount, 1e18)
        );
        payable(msg.sender).transfer(newBalance);
    }

    //**************************************** FEE *****************************************

    /**
     * @dev Address of the contract used to withdraw fee funds from exchange
     */
    address public WithdrawContract;

    /**
     * @dev uint threshold used to determine if user will be charged a flat or % fee
     */
    uint256 public feeThreshold;

    /**
     * @dev uint saves information on flatfee amount.
     */
    uint256 public flatFee;

    /**
     * @dev uint saves information on percentFee amount.
     */
    uint256 public percentFee;

    /**
     * @dev uint saves the running total balance collected in ETH
     * from fees.
     */
    uint256 public totalFeeBalance;

    /**
     * @dev Function sets the a new address to which amount withdrawn
     * will be sent to.
     */
    function setWithdrawContract() public {
        address treasuryAddress = oracle.addressChange(
            51,
            "setWithdrawContract"
        );
        WithdrawContract = treasuryAddress;
    }

    /**
     * @dev Getter function used to pull the total running balance of
     * fees collected in ETH.
     */
    function getTotalFeeBalance() public view returns (uint256) {
        return totalFeeBalance;
    }

    /**
     * @dev transfers funds to the approved address for withdrawal.
     */
    function withdrawFees() public payable {
        uint256 amount = oracle.numberChange(51, "withdrawFees");

        require(
            amount <= totalFeeBalance,
            "Treasury doesn't have sufficient funds."
        );

        totalFeeBalance = SafeMath.sub(totalFeeBalance, amount);
        payable(WithdrawContract).transfer(amount);
    }

    /**
     * @dev Setter for flat fee.
     */
    function newFlatFee() public isDev {
        uint256 newFee = oracle.numberChange(51, "newFlatFee");
        flatFee = newFee;
    }

    /**
     * @dev Setter for percentage fee.
     */
    function newPercentFee() public isDev {
        uint256 newFee = oracle.numberChange(51, "newPercentFee");
        percentFee = newFee;
    }

    /**
     * @dev Setter for new fee threshold.
     */

    function newThreshold() public isDev {
        uint256 newThreshold = oracle.numberChange(51, "newThreshold");
        feeThreshold = newThreshold;
    }

    //*********************************** Exchange Migration *************************************

    /**
     * @dev Contract to which all assets will be transfered to.
     */
    address public migrationExchange;

    /**
     * @dev Function sets a new address to which all assets will migrate.
     */
    function setMigrationAddress() public isDev {
        address newExchange = oracle.addressChange(51, "setMigrationAddress");
        migrationExchange = newExchange;
    }

    /**
     * @dev Function migrates both CBLT and ETH to the next version of Chromium.
     */
    function assetsMigration() public payable isDev {
        uint256 amount = oracle.numberChange(51, "assetsMigration");
        uint256 totalTokenBalance = token.balanceOf(address(this));

        IERC20(token).universalTransfer(migrationExchange, totalTokenBalance);
        payable(migrationExchange).transfer(amount);
    }
}

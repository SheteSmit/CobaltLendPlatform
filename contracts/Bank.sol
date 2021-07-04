// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/Ownable.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/SafeMath.sol";
import "./interfaces/UniversalERC20.sol";
import "./ExchangeOracle.sol";
import "./NFTLoan.sol";

// 0x433C6E3D2def6E1fb414cf9448724EFB0399b698

contract Bank {
    using UniversalERC20 for IERC20;

    // ********************************** CONTRACT CONTROL *********************************
    /**
     * @dev storing CBLT token in ERC20 type
     */
    IERC20 token;

    /**
     * @dev Creating oracle instance
     */
    ExchangeOracle oracle;

    /**
     * @dev CobaltLend oracle for scoring and CBLT price
     */
    address oracleAddress;

    /**
     * @dev Bool switch turns support for other tokens as reward outside of CBLT.
     */
    bool multipleTokenSupport;

    /**
     * @dev Variable to turn staking off and on.
     */
    bool public stakingStatus;

    /**
     * @dev Bool switch for all staking instance terminations
     */
    bool public terminateStaking;

    /**
     * @dev Mapping with key value address (token address) leads the current reserves avaliable for tokens
     * being currently offered to stake on.
     */
    mapping(address => uint256) public tokenReserve;

    /**
     * @dev Checks if all current staking instances are to be terminated
     */
    modifier stakingTermination(bool _functionSpecific) {
        if (_functionSpecific) {
            require(terminateStaking == true, "Staking is currently disabled.");
        } else {
            require(
                terminateStaking == false,
                "Staking is currently functioning as expected"
            );
        }
        _;
    }

    modifier isDev() {
        require(oracle.isDev(msg.sender) == true, "User is not a developer");
        _;
    }

    /**
     * @dev Getter function to pull info on support for other tokens.
     */
    function getTokenSupport() public view returns (bool) {
        return multipleTokenSupport;
    }

    /**
     * @dev Getter function to pull information for avaliable token amount in reserves
     * @param _tokenAddress token address of queried token
     */
    function getTokenReserve(address _tokenAddress)
        public
        view
        returns (uint256)
    {
        return tokenReserve[_tokenAddress];
    }

    /**
     * @dev Getter function to pull staking status on and off.
     */
    function getStakingStatus() public view returns (bool) {
        return stakingStatus;
    }

    /**
     * @dev Function terminates all staking instances and allows early balance withdrewal
     * @notice This action can only be perform under dev vote.
     */
    function setStakingTermination() public {
        bool status = oracle.boolChange(51, "setStakingTermination");
        terminateStaking = status;
    }

    /**
     * @dev Setter function to turn support for other tokens.
     * @notice This action can only be perform under dev vote.
     */
    function setTokenSupport() public {
        bool status = oracle.boolChange(51, "setTokenSupport");
        multipleTokenSupport = status;
    }

    /**
     * @dev Setter function to turn staking status on and off.
     * @notice This action can only be perform under dev vote.
     */
    function setStakingStatus() public {
        bool status = oracle.boolChange(51, "setStakingStatus");
        stakingStatus = status;
    }

    /**
     * @dev Function handles token deposit for treasury to track
     */
    function tokenReserveDeposit(uint256 _amount, address _tokenAddress)
        public
        payable
    {
        _amount = SafeMath.mul(_amount, 1e18);

        // IERC20(_tokenAddress).universalTransferFromSenderToThis(_amount);
        tokenReserve[_tokenAddress] = SafeMath.add(
            tokenReserve[_tokenAddress],
            _amount
        );
    }

    function setToken() public {
        address newToken = oracle.addressChange(51, "setToken");
        token = IERC20(newToken);
    }

    function setOracle() public {
        address newOracle = oracle.addressChange(51, "setOracle");
        oracle = ExchangeOracle(newOracle);
    }

    function testNFTContract()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        (
            uint256 riskScore,
            uint256 riskFactor,
            uint256 interestRate,
            uint256 userMaxTier,
            uint256 flatfee
        ) = NFT.getUser(msg.sender);
    }

    constructor(
        address _CBLT,
        address _oracle,
        address _NFT
    ) {
        oracle = ExchangeOracle(_oracle);
        token = IERC20(_CBLT);
        NFT = NFTLoan(_NFT);

        // ************************ Lending Data ***************************
        limitLending = 25;

        // ************************ Staking Data ***************************
        tierMax = 5;
        multipleTokenSupport = false;
        stakingStatus = true;
        flatFee = 3;
        penaltyFee = 3;
        percentFee = 3;
        flatFeeNFT = 10;
        terminateStaking = false;
        feeThreshold = 5e18;

        // Staking percentages based on deposit time and amount
        stakingRewardRate[1][1].interest = 1;
        stakingRewardRate[1][1].amountStakersLeft = 200;
        stakingRewardRate[1][1].tierDuration = 2629743;
        stakingRewardRate[1][2].interest = 2;
        stakingRewardRate[1][2].amountStakersLeft = 200;
        stakingRewardRate[1][2].tierDuration = 2629743;
        stakingRewardRate[1][3].interest = 3;
        stakingRewardRate[1][3].amountStakersLeft = 200;
        stakingRewardRate[1][3].tierDuration = 2629743;
        stakingRewardRate[1][4].interest = 4;
        stakingRewardRate[1][4].amountStakersLeft = 100;
        stakingRewardRate[1][4].tierDuration = 2629743;
        stakingRewardRate[1][5].interest = 4;
        stakingRewardRate[1][5].amountStakersLeft = 100;
        stakingRewardRate[1][5].tierDuration = 2629743;
        //
        stakingRewardRate[2][1].interest = 1;
        stakingRewardRate[2][1].amountStakersLeft = 200;
        stakingRewardRate[2][1].tierDuration = 5259486;
        stakingRewardRate[2][2].interest = 2;
        stakingRewardRate[2][2].amountStakersLeft = 200;
        stakingRewardRate[2][2].tierDuration = 5259486;
        stakingRewardRate[2][3].interest = 3;
        stakingRewardRate[2][3].amountStakersLeft = 200;
        stakingRewardRate[2][3].tierDuration = 5259486;
        stakingRewardRate[2][4].interest = 4;
        stakingRewardRate[2][4].amountStakersLeft = 100;
        stakingRewardRate[2][4].tierDuration = 5259486;
        stakingRewardRate[2][5].interest = 4;
        stakingRewardRate[2][5].amountStakersLeft = 100;
        stakingRewardRate[2][5].tierDuration = 5259486;
        //
        stakingRewardRate[3][1].interest = 1;
        stakingRewardRate[3][1].amountStakersLeft = 200;
        stakingRewardRate[3][1].tierDuration = 7889229;
        stakingRewardRate[3][2].interest = 2;
        stakingRewardRate[3][2].amountStakersLeft = 200;
        stakingRewardRate[3][2].tierDuration = 7889229;
        stakingRewardRate[3][3].interest = 3;
        stakingRewardRate[3][3].amountStakersLeft = 200;
        stakingRewardRate[3][3].tierDuration = 7889229;
        stakingRewardRate[3][4].interest = 4;
        stakingRewardRate[3][4].amountStakersLeft = 200;
        stakingRewardRate[3][4].tierDuration = 7889229;
        stakingRewardRate[3][5].interest = 4;
        stakingRewardRate[3][5].amountStakersLeft = 200;
        stakingRewardRate[3][5].tierDuration = 7889229;
        //
        stakingRewardRate[4][1].interest = 5;
        stakingRewardRate[4][1].amountStakersLeft = 500;
        stakingRewardRate[4][1].tierDuration = 15778458;
        stakingRewardRate[4][2].interest = 6;
        stakingRewardRate[4][2].amountStakersLeft = 500;
        stakingRewardRate[4][2].tierDuration = 15778458;
        stakingRewardRate[4][3].interest = 7;
        stakingRewardRate[4][3].amountStakersLeft = 500;
        stakingRewardRate[4][3].tierDuration = 15778458;
        stakingRewardRate[4][4].interest = 8;
        stakingRewardRate[4][4].amountStakersLeft = 1000;
        stakingRewardRate[4][4].tierDuration = 15778458;
        stakingRewardRate[4][5].interest = 9;
        stakingRewardRate[4][5].amountStakersLeft = 1000;
        stakingRewardRate[4][5].tierDuration = 15778458;
        //
        stakingRewardRate[5][1].interest = 6;
        stakingRewardRate[5][1].amountStakersLeft = 500;
        stakingRewardRate[5][1].tierDuration = 31556916;
        stakingRewardRate[5][2].interest = 7;
        stakingRewardRate[5][2].amountStakersLeft = 500;
        stakingRewardRate[5][2].tierDuration = 31556916;
        stakingRewardRate[5][3].interest = 8;
        stakingRewardRate[5][3].amountStakersLeft = 500;
        stakingRewardRate[5][3].tierDuration = 31556916;
        stakingRewardRate[5][4].interest = 9;
        stakingRewardRate[5][4].amountStakersLeft = 1000;
        stakingRewardRate[5][4].tierDuration = 31556916;
        stakingRewardRate[5][5].interest = 10;
        stakingRewardRate[5][5].amountStakersLeft = 1000;
        stakingRewardRate[5][5].tierDuration = 31556916;
    }

    /**
     * @dev
     */
    receive() external payable {
        balanceLent = SafeMath.sub(balanceLent, msg.value);
        emit Received(msg.sender, msg.value);
    }

    // **************************************** Events ************************************************

    event Received(address, uint256);

    /**
     * @dev Events emitted
     */
    event onReceived(address indexed _from, uint256 _amount);
    event onTransfer(
        address indexed _from,
        address indexed _to,
        uint256 _amount
    );
    event depositToken(address indexed _from, uint256 _amount);

    // ******************************** NFT Minting ***********************************

    /**
     * @dev
     */
    NFTLoan NFT;

    function setNFT() public {
        address newNFT = oracle.addressChange(50, "setNFT");
        NFT = NFTLoan(newNFT);
    }

    function expectedFee() public view returns (uint256) {
        uint256 fee;
        uint256 ETHprice = oracle.priceOfETH();
        uint256 ETHinUSD = SafeMath.div(100000000000000000000, ETHprice);

        fee = SafeMath.mul(ETHinUSD, flatFeeNFT);
        return fee;
    }

    function mintNFT(
        address _to,
        uint256 _tokenId,
        uint64 _riskScore,
        uint64 _riskFactor,
        uint64 _interestRate,
        uint64 _userMaxTier,
        uint256 _flatfee,
        string memory _uri
    ) public payable {
        uint256 fee;
        uint256 ETHprice = oracle.priceOfETH();
        uint256 ETHinUSD = SafeMath.div(100000000000000000000, ETHprice);

        fee = SafeMath.mul(ETHinUSD, flatFeeNFT);
        require(msg.value >= fee, "Amount sent to fund NFT was insufficient.");
        totalFeeBalance = SafeMath.add(totalFeeBalance, fee);

        NFT.mintBorrower(
            _to,
            _tokenId,
            _riskScore,
            _riskFactor,
            _interestRate,
            _userMaxTier,
            _flatfee,
            _uri
        );
    }

    function updateNFT(
        address _to,
        uint64 _riskScore,
        uint64 _riskFactor,
        uint64 _interestRate,
        uint64 _userMaxTier,
        uint256 _flatfee,
        uint256 _score
    ) public isDev {
        NFT.updateBorrower(
            _to,
            _riskScore,
            _riskFactor,
            _interestRate,
            _userMaxTier,
            _flatfee,
            _score
        );
    }

    // ******************************** Fee mechanism ***********************************

    /**
     * @dev
     */
    uint256 public feeThreshold;

    /**
     * @dev
     */
    uint256 public flatFeeNFT;

    /**
     * @dev Variable for staking flat fee.
     */
    uint256 public flatFee;

    /**
     * @dev Variable for staking flat fee.
     */
    uint256 public percentFee;

    /**
     * @dev uint stores percentage value of penalty applied to user's balance if
     * user breaks staking instance before staking period is over.
     */
    uint256 public penaltyFee;

    /**
     * @dev
     */
    address public withdrawAddress;

    /**
     * @dev Saving running fee total
     */
    uint256 public totalFeeBalance;

    modifier onlyWithdraw {
        require(
            msg.sender == withdrawAddress,
            "This address can't withdraw funds from treasury"
        );
        _;
    }

    /**
     * @dev
     */
    function setContract() public {
        address newWithdrawAddress = oracle.addressChange(51, "setContract");
        withdrawAddress = newWithdrawAddress;
    }

    /**
     * @dev
     */
    function getTotalBalance() public view returns (uint256) {
        return totalFeeBalance;
    }

    /**
     * @dev transfers funds to an approved contract
     */
    function withdrawFees() public payable onlyWithdraw {
        uint256 amount = oracle.numberChange(51, "withdrawFeesTreasury");

        require(
            amount <= totalFeeBalance,
            "Treasury doesn't have sufficient funds."
        );

        totalFeeBalance = SafeMath.sub(totalFeeBalance, amount);
        payable(msg.sender).transfer(amount);
    }

    /**
     * @dev Setter for staking flat fee.
     * @notice This action can only be perform under dev vote.
     */
    function newFlatFee() public {
        uint256 newFee = oracle.numberChange(51, "newFlatFee");
        flatFee = newFee;
    }

    /**
     * @dev Setter for staking percent fee.
     * @notice This action can only be perform under dev vote.
     */
    function newPercentFee() public {
        uint256 newFee = oracle.numberChange(51, "newPercentFee");
        percentFee = newFee;
    }

    /**
     * @dev
     */
    function newNFTFee() public {
        uint256 newFee = oracle.numberChange(51, "newNFTFee");
        flatFeeNFT = newFee;
    }

    /**
     * @dev
     */
    function newFeeThreshold() public {
        uint256 newThreshold = oracle.numberChange(51, "newFeeThreshold");
        feeThreshold = newThreshold;
    }

    // ************************************ Lottery ***************************************
    /**
     * @dev Address of lottery contract in charge of executing LotteryWinner function
     */
    address Lottery;

    /**
     * @dev Mapping with key value uint (lottery ticket) leads to the information on ticket
     * amount and time tier for the user to redeem his reward staking.
     */
    mapping(address => bool) lotteryBook;

    /**
     * @dev Modifier ensures only the lottery is allowed to pick new winners
     */
    modifier isLotteryContract {
        require(msg.sender == Lottery);
        _;
    }

    /**
     * @dev Getter function to pull current lottery address
     * @return address of contract
     */
    function getLotteryContract() public view returns (address) {
        return Lottery;
    }

    /**
     * @dev Getter function to pull information on lottery winner
     * @param _userAddress address of user queried
     * @return if user has a multiplier ready to be reedemed
     */
    function lotteryWinner(address _userAddress) public view returns (bool) {
        return (lotteryBook[_userAddress]);
    }

    /**
     * @dev Setter function to change the contract address for the lottery connected to
     * staking.
     * @notice This action can only be perform under dev vote.
     */
    function setLotteryContract() public {
        address newLottery = oracle.addressChange(51, "setLotteryContract");
        Lottery = newLottery;
    }

    /**
     * @dev Passes an array of winners
     * @param _winners array of all  winners
     * @notice Only an allowed address will be able to execute this function
     */
    function lottery(address[] memory _winners) public isLotteryContract {
        for (uint256 i = 0; i < _winners.length; i++) {
            lotteryBook[_winners[i]] = true;
        }
    }

    // ********************************* Staking ***********************************

    /**
     * @dev Struct saves tier interest, monitor amount of stakers allowed per tier and
     * tier duration used to calculate due dates.
     */
    struct crossTier {
        uint256 interest;
        uint256 amountStakersLeft;
        uint256 tierDuration;
    }

    /**
     * @dev Struct saves user data for ongoing staking and lottery results.
     */
    struct User {
        uint256 ethBalance;
        uint256 tokenReserved;
        uint256 depositTime;
        uint256 timeStakedTier;
        uint256 amountStakedTier;
        address currentTokenStaked;
    }

    /**
     * @dev Variable displaying the maximum time tier supported.
     */
    uint256 public tierMax;

    /**
     * @dev Nested mappings with key value uint (time tier) leads to submapping with key value uint
     * (amount tier) that leads the crossTier combination to pull the combination's interest amount of stakers
     * avaliable and the tier duration used to calculate due date period.
     */
    mapping(uint256 => mapping(uint256 => crossTier)) public stakingRewardRate;

    /**
     * @dev Mapping with key value address(the user's address) leads to the struct with the user's
     * staking and lottery information.
     */
    mapping(address => User) public userBook;

    /**
     * @dev Mapping with key value address (user address) leads to submapping with key value address
     * (token address) to pull the current balance rewarded to that user in the tokens
     */
    mapping(address => mapping(address => uint256)) public rewardWallet;

    /**
     * @dev Modifier checks if staking is currently online, the deposit is higher
     * than 0.015 ETH and tier value falls under the supported amount
     */
    modifier isValidStake(uint256 _timeStakedTier) {
        // Checks if staking is currently online
        require(stakingStatus == true, "Staking is currently offline");

        // Minimum deposit of 0.015 ETH
        require(
            msg.value > 15e15,
            "Error, deposit must be higher than 0.015 ETH"
        );

        // The tier input must be between 1 and tierMax
        require(
            _timeStakedTier >= 1 && _timeStakedTier <= tierMax,
            "Tier number must be a number between 1 and maximum tier supported."
        );
        _;
    }

    /**
     * @dev Modifier checks current support on other tokens as rewards for staking
     */
    modifier tokenIsCBLT(address _tokenAddress) {
        if (multipleTokenSupport == false) {
            require(
                _tokenAddress ==
                    address(0x433C6E3D2def6E1fb414cf9448724EFB0399b698),
                "Token must be CBLT"
            );
        }
        _;
    }

    function getEstimateUSD(uint256 _tokenAmount, address _tokenAddress)
        public
        view
        returns (uint256)
    {
        uint256 tokenToETH;
        uint256 ETHtoUSD;
        uint256 ETHprice = oracle.priceOfETH();
        uint256 tokenPrice = oracle.priceOfToken(address(_tokenAddress));
        uint256 ETHinUSD = SafeMath.div(100000000000000000000, ETHprice);

        tokenToETH = SafeMath.mul(_tokenAmount, tokenPrice);
        ETHtoUSD = SafeMath.div(tokenToETH, ETHinUSD);
        return ETHtoUSD;
    }

    /**
     * @dev Getter function pulls current tier information.
     * @param _amount amount value sent in ETH used to access tier combination.
     * @param _timeTier key tier time value used to access tier combination.
     * @return Returns the interest under time and amount tier combination, amount of stakers avaliable.
     * and the tierDuration or period staked in EPOCH.
     */
    function getTierInformation(uint256 _amount, uint256 _timeTier)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        uint256 amountStakedTier;

        if (_amount <= 4e17) {
            amountStakedTier = 1;
        } else if (_amount <= 2e18) {
            amountStakedTier = 2;
        } else if (_amount <= 5e18) {
            amountStakedTier = 3;
        } else if (_amount <= 25e18) {
            amountStakedTier = 4;
        } else {
            amountStakedTier = 5;
        }

        return (
            stakingRewardRate[_timeTier][amountStakedTier].interest,
            stakingRewardRate[_timeTier][amountStakedTier].amountStakersLeft,
            stakingRewardRate[_timeTier][amountStakedTier].tierDuration
        );
    }

    /**
     * @dev
     */
    function getTierCombination(uint256 _amountTier, uint256 _timeTier)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (
            stakingRewardRate[_timeTier][_amountTier].interest,
            stakingRewardRate[_timeTier][_amountTier].amountStakersLeft,
            stakingRewardRate[_timeTier][_amountTier].tierDuration
        );
    }

    /**
     * @dev Getter function to pull information from the user.
     * @param _userAddress address of the queried user.
     */
    function getUser(address _userAddress)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            userBook[_userAddress].ethBalance,
            userBook[_userAddress].tokenReserved,
            userBook[_userAddress].depositTime,
            userBook[_userAddress].timeStakedTier,
            userBook[_userAddress].amountStakedTier,
            userBook[_userAddress].currentTokenStaked
        );
    }

    /**
     * @dev Getter function to pull avaliable tokens ready to withdraw from reserves
     * @param _userAddress address of queried user
     * @param _tokenAddress address of queried token
     */
    function getUserBalance(address _userAddress, address _tokenAddress)
        public
        view
        returns (uint256)
    {
        return rewardWallet[_userAddress][_tokenAddress];
    }

    /**
     * @dev Setter function to modify interests based on time and amount
     * @notice Function is used to modify existing tiers or create new tiers if new
     * tier key values are passed, creating new tier combinations.If time tier used
     * is higher than current tier max, new tier combination was just created and
     * tierMax should change to new cap
     * @notice This action can only be perform under dev vote
     */
    function setTierInformation() public {
        (
            uint256 amountTier,
            uint256 timeTier,
            uint256 interest,
            uint256 amountStakersLeft,
            uint256 tierDuration
        ) = oracle.tierChange(51, "setTierInformation");

        require(amountTier <= 5, "Amount tier must be lower or equal to 5");

        stakingRewardRate[timeTier][amountTier].interest = interest;
        stakingRewardRate[timeTier][amountTier]
        .amountStakersLeft = amountStakersLeft;
        stakingRewardRate[timeTier][amountTier].tierDuration = tierDuration;

        // Check if time tier modified increases the tierMax cap
        if (timeTier > tierMax) {
            tierMax = timeTier; // Save new tierMax if so
        }
    }

    function calculateAmountTier(uint256 _amount, uint256 _timeStakedTier)
        internal
        pure
        returns (uint256, uint256)
    {
        uint256 amountStakedTier;
        uint256 paidAdvanced;

        if (_amount <= 4e17) {
            amountStakedTier = 1;
        } else if (_amount <= 2e18) {
            amountStakedTier = 2;
        } else if (_amount <= 5e18) {
            amountStakedTier = 3;
        } else if (_amount <= 25e18) {
            amountStakedTier = 4;

            if (_timeStakedTier == 4) {
                paidAdvanced = 25;
            } else if (_timeStakedTier == 5) {
                paidAdvanced = 50;
            }
        } else {
            amountStakedTier = 5;

            if (_timeStakedTier == 4) {
                paidAdvanced = 25;
            } else if (_timeStakedTier == 5) {
                paidAdvanced = 50;
            }
        }

        return (amountStakedTier, paidAdvanced);
    }

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

    function calculateRewardReturn(
        uint256 _timeStakedTier,
        uint256 _amountStakedTier,
        uint256 _balance,
        address _tokenAddress
    ) internal view returns (uint256) {
        uint256 dueDate;
        uint256 tokensReserved;

        if (userBook[msg.sender].ethBalance > 0) {
            dueDate = SafeMath.add(
                stakingRewardRate[_timeStakedTier][_amountStakedTier]
                .tierDuration,
                userBook[msg.sender].depositTime
            );

            require(
                block.timestamp > 1,
                "Current staking period is not over yet"
            );
        }

        tokensReserved = calculateRewardDeposit(
            _balance,
            _timeStakedTier,
            _amountStakedTier,
            _tokenAddress
        );
        return tokensReserved;
    }

    /**
     * @dev Function sends an estimation of how many tokens user is owed
     * @param _amount Amount of ETH send by the user
     * @param _timeStakedTier Duration tier for staking instance
     * @param _tokenAddress Address of token rewarded
     */
    function getTokenReturn(
        uint256 _amount,
        uint256 _timeStakedTier,
        address _tokenAddress
    )
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        uint256 fee;
        uint256 tokensOwed;
        uint256 paidAdvanced;
        uint256 amountStakedTier;
        uint256 newBalance = SafeMath.add(
            userBook[msg.sender].ethBalance,
            _amount
        );

        (amountStakedTier, paidAdvanced) = calculateAmountTier(
            SafeMath.add(_amount, userBook[msg.sender].ethBalance),
            _timeStakedTier
        );

        (newBalance, fee) = calculateFee(newBalance);

        tokensOwed = calculateRewardReturn(
            _timeStakedTier,
            amountStakedTier,
            newBalance,
            _tokenAddress
        );

        return (tokensOwed, paidAdvanced, newBalance, amountStakedTier);
    }

    /**
     * @dev
     */
    function lendingPoolWithdraw(uint256 _amount) internal {
        uint256 timeStakedTier = userBook[msg.sender].timeStakedTier;
        uint256 amountStakedTier = userBook[msg.sender].amountStakedTier;

        if (amountStakedTier == 4 || amountStakedTier == 5) {
            if (timeStakedTier == 4 || timeStakedTier == 5) {
                lendingPool = SafeMath.sub(lendingPool, _amount);
            }
        }
    }

    function lendingPoolDeposit() internal {
        uint256 timeStakedTier = userBook[msg.sender].timeStakedTier;
        uint256 amountStakedTier = userBook[msg.sender].amountStakedTier;
        if (amountStakedTier > 0) {
            if (amountStakedTier != 4 && amountStakedTier != 5) {
                if (timeStakedTier != 4 && timeStakedTier != 5) {
                    lendingPool = SafeMath.add(
                        lendingPool,
                        userBook[msg.sender].ethBalance
                    );
                }
            }
        }
    }

    /**
     * @dev Function stakes ethereum based on the user's desired duration and token of reward
     * @param _timeStakedTier intended duration of their desired staking period
     * @param _tokenAddress token address rewarded to user staking
     * CBLT used as default during launch
     * @notice Modifier tokenIsCBLT checks if support for other tokens as reward is turned on.
     */
    function stakeEth(uint32 _timeStakedTier, address _tokenAddress)
        public
        payable
        tokenIsCBLT(_tokenAddress)
        isValidStake(_timeStakedTier)
        stakingTermination(false)
    {
        uint256 amountStakedTier;
        uint256 paidAdvanced = 0;
        uint256 tokensReserved;
        uint256 balance;
        uint256 fee;
        uint256 dueDate;
        uint256 userReserved = userBook[msg.sender].tokenReserved;

        if (userReserved > 0) {
            payRewardWallet(userReserved);
        }

        dueDate = SafeMath.add(
            stakingRewardRate[userBook[msg.sender].timeStakedTier][
                userBook[msg.sender].amountStakedTier
            ]
            .tierDuration,
            userBook[msg.sender].depositTime
        );

        require(block.timestamp >= 1, "Staking period is not over.");

        (
            tokensReserved,
            paidAdvanced,
            balance,
            amountStakedTier
        ) = getTokenReturn(msg.value, _timeStakedTier, _tokenAddress);

        require(
            tokensReserved <= tokenReserve[_tokenAddress],
            "Treasury is currently depleted"
        );

        if (paidAdvanced > 0) {
            uint256 tokensSent = SafeMath.multiply(
                tokensReserved,
                paidAdvanced,
                100
            );
            // IERC20(_tokenAddress).universalTransfer(msg.sender, tokensSent);

            userBook[msg.sender].tokenReserved = SafeMath.add(
                userBook[msg.sender].tokenReserved,
                SafeMath.sub(tokensReserved, tokensSent)
            );

            lendingPoolDeposit();

            lendingPool = SafeMath.add(
                lendingPool,
                SafeMath.sub(balance, userBook[msg.sender].ethBalance)
            );
        } else {
            lendingPoolWithdraw(userBook[msg.sender].ethBalance);
            userBook[msg.sender].tokenReserved = SafeMath.add(
                userBook[msg.sender].tokenReserved,
                tokensReserved
            );
        }

        if (!lotteryBook[msg.sender]) {
            require(
                stakingRewardRate[_timeStakedTier][amountStakedTier]
                .amountStakersLeft > 0,
                "Tier depleted, come back later"
            );

            stakingRewardRate[_timeStakedTier][amountStakedTier]
            .amountStakersLeft = SafeMath.sub(
                stakingRewardRate[_timeStakedTier][amountStakedTier]
                .amountStakersLeft,
                1
            );
        }

        userBook[msg.sender].timeStakedTier = _timeStakedTier;
        userBook[msg.sender].amountStakedTier = amountStakedTier;
        userBook[msg.sender].currentTokenStaked = _tokenAddress;
        userBook[msg.sender].depositTime = block.timestamp;
        userBook[msg.sender].ethBalance = balance;

        totalFeeBalance = SafeMath.add(totalFeeBalance, fee);
        tokenReserve[_tokenAddress] = SafeMath.sub(
            tokenReserve[_tokenAddress],
            tokensReserved
        );
    }

    /**
     * @dev Helper function calculates amount of tokens owed to user at current market value
     * with both tier combinations. If user is restaking the function calls another helper
     * function (payRewardWalletDeposit(userReserved)) that deposits previous tokens staked
     * this function also recalculates the amount based on deposit and current token value.
     * @param _amount new amount balance saved by user. Combination of existing balance and
     * incoming amount.
     * @param _timeStakedTier time duration tier for staking period
     * @param _amountStakedTier time amount tier for staking period
     * @param _tokenAddress token address of token owed at the end of staking period
     * be rewarded with x2 interest reward for his staking period
     */
    function calculateRewardDeposit(
        uint256 _amount,
        uint256 _timeStakedTier,
        uint256 _amountStakedTier,
        address _tokenAddress
    ) internal view returns (uint256) {
        uint256 tokenPrice = oracle.priceOfToken(address(_tokenAddress));
        uint256 interest;

        if (lotteryBook[msg.sender]) {
            interest = SafeMath.mul(
                stakingRewardRate[_timeStakedTier][_amountStakedTier].interest,
                2
            );
        } else {
            interest = stakingRewardRate[_timeStakedTier][_amountStakedTier]
            .interest;
        }

        return
            SafeMath.mul(
                SafeMath.div(
                    SafeMath.multiply(_amount, interest, 100),
                    tokenPrice
                ),
                1e18
            );
    }

    /**
     * @dev Helper function calculates the amount of tokens owed to user based on previous
     * token value, time and amount tier combination and current token value and saves the
     * amount in the virtual wallet for the user to withdraw from.
     * @notice if the new amount promised to user is higher than avaliable for a lottery winner
     * treasury will check if we can fund the reward. If not, lottery ticket is saved for another
     * instance
     * @param _userReserved maximum amount of tokens reserved for user based on previous
     * token value when staking instance was created.
     */
    function payRewardWallet(uint256 _userReserved) internal {
        uint256 interest;
        uint256 percentBasedAmount = 100;
        uint256 amountStakedPreviously = userBook[msg.sender].ethBalance;
        uint256 previousTimeTier = userBook[msg.sender].timeStakedTier;
        uint256 previousAmountTier = userBook[msg.sender].amountStakedTier;
        address previousTokenAddress = userBook[msg.sender].currentTokenStaked;
        uint256 previousTokenPrice = oracle.priceOfToken(previousTokenAddress);

        if (
            previousTimeTier == 4 &&
            (previousAmountTier == 4 || previousAmountTier == 5)
        ) {
            percentBasedAmount = 75;
        } else if (
            previousTimeTier == 5 &&
            (previousAmountTier == 4 || previousAmountTier == 5)
        ) {
            percentBasedAmount = 50;
        }

        if (lotteryBook[msg.sender]) {
            interest = SafeMath.mul(
                stakingRewardRate[userBook[msg.sender].timeStakedTier][
                    previousAmountTier
                ]
                .interest,
                2
            );
        } else {
            interest = stakingRewardRate[userBook[msg.sender].timeStakedTier][
                previousAmountTier
            ]
            .interest;
        }

        uint256 tokensOwed = SafeMath.mul(
            SafeMath.div(
                SafeMath.multiply(
                    SafeMath.multiply(
                        amountStakedPreviously,
                        percentBasedAmount,
                        100
                    ),
                    interest,
                    100
                ),
                previousTokenPrice
            ),
            1e18
        );

        if (tokensOwed >= _userReserved) {
            if (lotteryBook[msg.sender]) {
                if (tokensOwed < tokenReserve[previousTokenAddress]) {
                    tokenReserve[previousTokenAddress] = SafeMath.sub(
                        tokenReserve[previousTokenAddress],
                        tokensOwed
                    );
                    rewardWallet[msg.sender][previousTokenAddress] = SafeMath
                    .add(
                        rewardWallet[msg.sender][previousTokenAddress],
                        tokensOwed
                    );

                    lotteryBook[msg.sender] = false;
                } else {
                    rewardWallet[msg.sender][previousTokenAddress] = SafeMath
                    .add(
                        rewardWallet[msg.sender][previousTokenAddress],
                        _userReserved
                    );
                }
            } else {
                rewardWallet[msg.sender][previousTokenAddress] = SafeMath.add(
                    rewardWallet[msg.sender][previousTokenAddress],
                    _userReserved
                );

                stakingRewardRate[previousTimeTier][previousAmountTier]
                .amountStakersLeft = SafeMath.add(
                    stakingRewardRate[previousTimeTier][previousAmountTier]
                    .amountStakersLeft,
                    1
                );
            }
            userBook[msg.sender].tokenReserved = 0;
        } else {
            uint256 tokenDifference = SafeMath.sub(_userReserved, tokensOwed);

            tokenReserve[previousTokenAddress] = SafeMath.add(
                tokenReserve[previousTokenAddress],
                tokenDifference
            );

            rewardWallet[msg.sender][previousTokenAddress] = SafeMath.add(
                rewardWallet[msg.sender][previousTokenAddress],
                tokensOwed
            );

            userBook[msg.sender].tokenReserved = 0;

            if (!lotteryBook[msg.sender]) {
                stakingRewardRate[previousTimeTier][previousAmountTier]
                .amountStakersLeft = SafeMath.add(
                    stakingRewardRate[previousTimeTier][previousAmountTier]
                    .amountStakersLeft,
                    1
                );
                lotteryBook[msg.sender] = false;
            }
        }
    }

    /**
     * @dev Function sends a specified amount of ETH from the users balance back to the user
     * @notice Function also allocates final amount tokens owed into users reward wallet
     * if this hasnt ocurred already
     */
    function withdrawEth(uint256 _amount)
        public
        payable
        stakingTermination(false)
    {
        uint256 dueDate;
        uint256 userReserved = userBook[msg.sender].tokenReserved;
        uint256 stakingPeriodTier = userBook[msg.sender].timeStakedTier;
        uint256 stakingAmountTier = userBook[msg.sender].amountStakedTier;
        uint256 userBalance = userBook[msg.sender].ethBalance;

        if (userReserved > 0) {
            payRewardWallet(userReserved);
        }

        dueDate = SafeMath.add(
            stakingRewardRate[stakingPeriodTier][stakingAmountTier]
            .tierDuration,
            userBook[msg.sender].depositTime
        );

        require(block.timestamp >= 1, "Staking period is not over.");

        lendingPoolWithdraw(_amount);

        userBook[msg.sender].ethBalance = SafeMath.sub(userBalance, _amount);

        payable(msg.sender).transfer(_amount);
    }

    /**
     * @dev Function transfer an amount of desired cblt tokens from the user's
     * token reward wallet.
     * @notice Function also calculates any running token balance reserved and deposits it
     * on the user's reward wallet
     * @param _withdrawTokenAddress token address of token being withdrawn
     */
    function withdrawStaking(address _withdrawTokenAddress)
        public
        payable
        stakingTermination(false)
    {
        uint256 dueDate;
        uint256 userReserved = userBook[msg.sender].tokenReserved;
        uint256 stakingPeriodTier = userBook[msg.sender].timeStakedTier;
        uint256 stakingAmountTier = userBook[msg.sender].amountStakedTier;
        uint256 totalBalance = rewardWallet[msg.sender][_withdrawTokenAddress];

        dueDate = SafeMath.add(
            stakingRewardRate[stakingPeriodTier][stakingAmountTier]
            .tierDuration,
            userBook[msg.sender].depositTime
        );

        if (userReserved > 0 && (dueDate < block.timestamp)) {
            payRewardWallet(userReserved);
            totalBalance = rewardWallet[msg.sender][_withdrawTokenAddress];
        }

        uint256 aproxUSD = getEstimateUSD(
            SafeMath.div(totalBalance, 1e18),
            _withdrawTokenAddress
        );

        require(
            aproxUSD > 50,
            "Amount in CBLT must be higher than 50 total worth in value."
        );

        rewardWallet[msg.sender][_withdrawTokenAddress] = 0;

        // IERC20(_withdrawTokenAddress).universalTransfer(
        //     msg.sender,
        //     totalBalance
        // );
    }

    /**
     * @dev Breaks staking instance for users with a duration tier higher than
     * the default of 5. A relative amount of tokens reserved are sent to the
     * user based on time staked.
     */
    function earlyWithdraw() public payable stakingTermination(false) {
        uint256 stakingPeriodTier = userBook[msg.sender].timeStakedTier;
        uint256 stakingAmountTier = userBook[msg.sender].amountStakedTier;
        address previousTokenAddress = userBook[msg.sender].currentTokenStaked;
        uint256 timeOfStaking = userBook[msg.sender].depositTime;
        uint256 userBalance = userBook[msg.sender].ethBalance;
        uint256 tokensReserved = userBook[msg.sender].tokenReserved;
        uint256 tierDuration = stakingRewardRate[stakingPeriodTier][
            stakingAmountTier
        ]
        .tierDuration;

        require(stakingPeriodTier > 5, "Tier not supporting early withdraw");

        uint256 timeStaked = SafeMath.sub(block.timestamp, timeOfStaking);
        uint256 tokenPrice = oracle.priceOfToken(previousTokenAddress);

        uint256 tokensOwed = SafeMath.mul(
            SafeMath.div(
                SafeMath.multiply(
                    userBalance,
                    stakingRewardRate[stakingPeriodTier][stakingAmountTier]
                    .interest,
                    100
                ),
                tokenPrice
            ),
            1e18
        );

        uint256 relativeOwed = SafeMath.multiply(
            tokensOwed,
            timeStaked,
            tierDuration
        );

        uint256 fee = SafeMath.multiply(
            userBook[msg.sender].ethBalance,
            penaltyFee,
            100
        );

        // Reset values
        userBook[msg.sender].ethBalance = SafeMath.sub(
            userBook[msg.sender].ethBalance,
            fee
        );
        totalFeeBalance = SafeMath.add(totalFeeBalance, fee);
        userBook[msg.sender].tokenReserved = 0;

        if (userBook[msg.sender].ethBalance >= feeThreshold) {
            userBook[msg.sender].depositTime = SafeMath.add(
                block.timestamp,
                604800
            );
        } else {
            userBook[msg.sender].depositTime = SafeMath.add(
                block.timestamp,
                259200
            );
        }

        if (relativeOwed > tokensReserved) {
            // IERC20(previousTokenAddress).universalTransfer(
            //     msg.sender,
            //     tokensReserved
            // );
        } else {
            // IERC20(previousTokenAddress).universalTransfer(
            //     msg.sender,
            //     relativeOwed
            // );
        }
    }

    /**
     * @dev Function allows all users to break staking instance and withdraw
     * all eth deposited for staking.
     */
    function emergencyWithdraw() public payable stakingTermination(true) {
        uint256 userBalance = userBook[msg.sender].ethBalance;
        require(userBalance > 0);

        userBook[msg.sender].ethBalance = 0;

        payable(msg.sender).transfer(userBalance);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // ****************************** Lending **********************************
    /**
     * @dev Variable displays information on ETH staked in the treasury for time tiers 4 and 5.
     */
    uint256 public lendingPool;

    /**
     * @dev
     */
    uint256 public balanceLent;

    /**
     * @dev
     */
    address public LendingContract;

    /**
     * @dev
     */
    uint256 public limitLending;

    /**
     * @dev
     */
    function setLendingContract() public {
        address newLendingContract = oracle.addressChange(
            51,
            "setLendingContract"
        );
        LendingContract = newLendingContract;
    }

    /**
     * @dev
     */
    function fundLendingContract() public payable isDev {
        uint256 lendingAvailable;
        uint256 transferableBalance;

        lendingAvailable = SafeMath.multiply(lendingPool, limitLending, 100);
        require(
            balanceLent < lendingAvailable,
            "Not enough balance in treasury to fund lending"
        );

        transferableBalance = SafeMath.sub(lendingAvailable, balanceLent);
        balanceLent = SafeMath.add(balanceLent, transferableBalance);

        payable(LendingContract).transfer(transferableBalance);
    }
}

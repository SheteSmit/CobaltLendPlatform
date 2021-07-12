// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/SafeMath.sol";
import "./ExchangeOracle.sol";
import "./NFTLoan.sol";

contract Lottery {
    /**
     * @dev Address of the API used for blockchain data migration
     */
    address private API;

    /**
     * @dev Address of dev panel
     */
    address private Oracle;

    /**
     * @dev Address of the NFT
     */
    address private NFT;

    /**
     * @dev Bool stores status for lottery. True - on / False - off.
     */
    bool public lotteryStatus;

    /**
     * @dev Variable stores all ether collected from ticket purchases.
     */
    uint256 totalFeeBalance;

    /**
     * @dev Function sets the address of the API
     * @notice This action can only be perform under dev vote.
     */
    function setAPI(address _newAPI) public {
        API = _newAPI;
    } // Only dev contract // Deployed on Binance

    /**
     * @dev Function sets the status of the lottery
     * @notice This action can only be perform under dev vote.
     */
    function setLottery(bool _status) public {
        lotteryStatus = _status;
    } // Only dev contract // Deployed on Binance

    /**
     * @dev Modifier restricts access to only API as msg.sender
     */
    modifier onlyAPI {
        require(msg.sender == API, "Access denied");
        _;
    }

    constructor(address _oracle, address _NFT) {
        Oracle = _oracle;
        NFT = _NFT;
    }

    // ****************************** Lottery - Staking ******************************
    /**
     * @dev Limit cap for API bot to handle lottery updating on ethereum chain
     */
    uint256 lotteryTicketCap;

    /**
     * @dev Struct saving ticket information
     */
    struct Lotteryticket {
        address[] participants;
        address[] winners;
        uint256 dateLimit;
        uint256 fee;
        bool transferedChain;
    }

    /**
     * @dev Mapping key value uint leads to information on respective lottery ticket
     */
    mapping(uint256 => Lotteryticket) public lotteryBook;

    /**
     * @dev Function gets winning lottery ticket and returns winning lottery
     * tickets address
     */
    function getLotteryWinners(uint256 _lotteryTicket)
        public
        view
        returns (address[] memory)
    {
        require(
            lotteryBook[_lotteryTicket].transferedChain == false,
            "This information is already been transfered over to ethereum"
        );
        return lotteryBook[_lotteryTicket].winners;
    }

    /**
     * @dev Modifier gives parameters of a valid lottery ticket
     */
    modifier validEntry(uint256 _lotteryTicket) {
        require(lotteryStatus == true, "Lottery is currently offline.");

        require(
            lotteryTicketCap == _lotteryTicket &&
                lotteryBook[_lotteryTicket].dateLimit < block.timestamp,
            "This ticket does not exist or is not currently active."
        );

        require(
            msg.value >= lotteryBook[_lotteryTicket].fee,
            "Value sent is less than ticket price."
        );
        _;
    }

    /**
     * @dev Function creates a ticket for the lottery system
     * @notice This action can only be perform under dev vote.
     */
    function createTicket(
        uint256 _numWinners,
        uint256 _feePrice,
        uint256 _dateLimit
    ) public {
        lotteryBook[lotteryTicketCap] = Lotteryticket(
            new address[](0),
            new address[](_numWinners),
            SafeMath.add(block.timestamp, _dateLimit),
            _feePrice,
            false
        );
        lotteryTicketCap = SafeMath.add(lotteryTicketCap, 1);
    } // Only dev contract // Deployed on Binance

    /**
     * @dev
     * @notice This action can only be perform by the API.
     */
    function setTicketStatus(uint256 _ticketQuery) public onlyAPI {
        lotteryBook[_ticketQuery].transferedChain = true;
    }

    /**
     * @dev Function purchases a ticket and records user address as lottery
     * participant
     */
    function buyStakingTicket() public payable validEntry(lotteryTicketCap) {
        lotteryBook[lotteryTicketCap].participants.push(msg.sender);
        totalFeeBalance = SafeMath.add(totalFeeBalance, msg.value);
    }

    /**
     * @dev Function changes the status of lottery ticket to the winner
     */
    function setLotteryWinners(uint256[] memory _winnerIndex) public onlyAPI {
        uint256 currentTicket = lotteryTicketCap;

        require(
            lotteryBook[currentTicket].transferedChain == false,
            "Winners have already been picked."
        );

        for (uint256 i = 0; i < _winnerIndex.length; i++) {
            lotteryBook[currentTicket].winners.push(
                lotteryBook[currentTicket].participants[_winnerIndex[i]]
            );
        }
    } // Only dev contract // Deployed on Binance

    // ************************** Contract fee withdraw *************************
    /**
     * @dev Address stores the secondary recipient to withdraw funds from fees
     * collected
     */
    address secondaryRecipient;

    /**
     * @dev Set secondary recipient for fee withdraw
     */
    function setSecondaryRecipient(address _newRecipient) public {
        secondaryRecipient = _newRecipient;
    }

    /**
     * @dev Withdraws a set amount of ether to fund API wallet
     */
    function fundAPI(uint256 _amount) public payable {
        require(
            _amount <= totalFeeBalance,
            "Amount is higher than available ether balance."
        );
        payable(msg.sender).transfer(_amount);
    }

    /**
     * @dev Withdraw funds for secondary contracts
     */
    function fundSecondary(uint256 _amount) public payable {
        require(
            _amount <= totalFeeBalance,
            "Amount is higher than available ether balance."
        );
        payable(secondaryRecipient).transfer(_amount);
    }
}

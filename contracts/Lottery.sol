// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/Ownable.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/SafeMath.sol";
import "./interfaces/UniversalERC20.sol";
import "./ExchangeOracle.sol";
import "./NFTLoan.sol";

contract Lottery {

    /**
     * @dev Variable of address of the API
     */
    address private API;
    
    /**
     * @dev Variable gives the lottery status 
     */
    bool public lotteryStatus;
    
    /**
     * @dev Variable that gives the total fee balance of the lottery
     */
    uint256 totalFeeBalance;
    
    /**
     * @dev Function sets the Api of the address
     */
    function setAPI(address _newAPI) public {
        API = _newAPI;
    } // Only dev contract // Deployed on Binance
    
    /**
     * @dev Function sets the status of the lottery
     */
    function setLottery(bool _status) public {
        lotteryStatus = _status;
    } // Only dev contract // Deployed on Binance

    // ****************************** Lottery - Staking ******************************

    uint256 lotteryTicketCap;

    struct Lotteryticket {
        address[] participants;
        address[] winners;
        uint256 lotteryType;
        uint256 dateLimit;
        uint256 fee;
        bool pickedWinners;
    }

    mapping(uint256 => Lotteryticket) lotteryBook;
    
    /**
     * @dev Function gets lottery tickets and returns 
     * address of lottery ticket participants
     */
    function getLotteryParticipants(uint256 _lotteryTicket)
        public
        view
        returns (address[] memory)
    {
        return lotteryBook[_lotteryTicket].participants;
    }
    
    /**
     * @dev Function gets winning lottery ticket and returns winning lottery 
     * tickets address
     */
    function getLotteryWinners(uint256 _lotteryTicket)
        public
        view
        returns (address[] memory)
    {
        return lotteryBook[_lotteryTicket].winners;
    }
    
    /**
     * @dev Modifier gives parameters of a valid lottery ticket
     */
    modifier validEntry(uint256 _lotteryTicket) {
        require(lotteryStatus == true, "Lottery is currently offline");
        require(
            lotteryBook[_lotteryTicket].dateLimit < block.timestamp,
            "Ticket does not exist"
        );

        require(
            msg.value >= lotteryBook[_lotteryTicket].fee,
            "Value sent is less than ticket price"
        );
        _;
    }
    
    /**
     * @dev Function creates a ticket for the lottery system
     */
    function createTicket(
        uint256 _numParticipants,
        uint256 _numWinners,
        uint256 _feePrice,
        uint256 _dateLimit,
        uint256 _lotteryType
    ) public {
        // Staking _numParticipants must be 0
        lotteryBook[lotteryTicketCap] = Lotteryticket(
            new address[](_numParticipants),
            new address[](_numWinners),
            _lotteryType,
            SafeMath.add(block.timestamp, _dateLimit),
            _feePrice,
            false
        );
    } // Only dev contract // Deployed on Binance
    
    
    function buyStakingTicket(uint256 _lotteryTicket)
        public
        payable
        validEntry(_lotteryTicket)
    {
        lotteryBook[_lotteryTicket].participants.push(msg.sender);
        totalFeeBalance = SafeMath.add(totalFeeBalance, msg.value);
    }
    
    /**
     * @dev Function allows user to buy open slot of a lottery ticket
     */
    function buyLotteryTicket(uint256 _lotteryTicket, uint256 _slotNumber)
        public
        payable
        validEntry(_lotteryTicket)
    {
        require(
            _slotNumber < lotteryBook[_lotteryTicket].participants.length,
            "Slot number is above supported"
        );
        require(
            lotteryBook[_lotteryTicket].participants[_slotNumber] !=
                address(0x0),
            "Slot is taken already"
        );
        lotteryBook[_lotteryTicket].participants[_slotNumber] = msg.sender;
        totalFeeBalance = SafeMath.add(totalFeeBalance, msg.value);
    }
    
    /**
     * @dev Function changes the status of lottery ticket to the winner
     */
    function setLotteryWinners(
        uint256[] memory _winnerIndex,
        uint256 _lotteryTicket
    ) public {
        require(
            lotteryBook[_lotteryTicket].pickedWinners == false,
            "Winners have already been picked."
        );
        for (uint256 i = 0; i < _winnerIndex.length; i++) {
            lotteryBook[_lotteryTicket].winners.push(
                lotteryBook[_lotteryTicket].participants[i]
            );
        }
        lotteryBook[_lotteryTicket].pickedWinners = true;
    } // Only dev contract // Deployed on Binance

    // ************************** Contract fee withdraw *************************
    
    /**
     * @dev Withdraw funds of the lottery
     */
    function withdrawFunds() public payable {}
}

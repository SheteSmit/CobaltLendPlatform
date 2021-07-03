// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/IERC20.sol";
import "./interfaces/SafeMath.sol";
import "./interfaces/UniversalERC20.sol";
import "./ExchangeOracle.sol";
import "./NFTLoan.sol";

// 0x433C6E3D2def6E1fb414cf9448724EFB0399b698

contract Lending {
    using UniversalERC20 for IERC20;

    /**
     * @dev Creating oracle instance
     */
    ExchangeOracle oracle;

    /**
     * @dev
     */
    NFTLoan NFT;

    /**
     * @dev
     */
    address Treasury;

    /**
     * @dev
     */
    function withdrawTreasury() public payable {}

    /**
     * @dev
     */
    function depositTreasury() public payable {}

    // ******************************** Lending **************************************

    /**
     * @dev
     */
    uint256 totalBalance;

    /**
     * @dev Mapping with key to store all loan information with the key of borrower address
     *  and value of Loan struct with all loan information
     */
    mapping(address => Loan) public loanBook;

    /**
     * @dev Information from previously fullfilled loans are stored into the blockchain
     * before being permanently deleted
     */
    mapping(address => Loan[]) public loanRecords;

    /**
     * @dev
     */
    address[] loanBorrowers;

    /**
     * @dev struct to access information on tier structure
     */
    struct loanTier {
        uint256 principalLimit;
        uint256 maximumPaymentPeriod;
        uint256 maxVoters;
    }

    mapping(uint256 => loanTier) loanTiers;

    /**
     * @dev Struct to store loan information
     */
    struct Loan {
        address borrower; // Address of wallet
        uint256 amountBorrowed; // Initial loan balance
        uint256 remainingBalance; // Remaining balance
        uint256 minimumPayment; // MinimumPayment // Can be calculated off total amount
        uint256 collateral; // Amount owed back to borrower after loan is paid in full
        bool active; // Is the current loan active (Voted yes)
        bool initialized; // Does the borrower have a current loan application
        bool funded;
        uint256 timeCreated; // Time of loan application also epoch in days
        uint256 dueDate; // Limit date for next payment
        uint256 totalVote; // Total amount determined by tier
        address currentToken; // Address of collateral token
    }

    function getLoan()
        public
        view
        returns (
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            bool,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            loanBook[msg.sender].borrower,
            loanBook[msg.sender].amountBorrowed,
            loanBook[msg.sender].remainingBalance,
            loanBook[msg.sender].minimumPayment,
            loanBook[msg.sender].collateral,
            loanBook[msg.sender].active,
            loanBook[msg.sender].initialized,
            loanBook[msg.sender].timeCreated,
            loanBook[msg.sender].dueDate,
            loanBook[msg.sender].totalVote,
            loanBook[msg.sender].currentToken
        );
    }

    /**
     * @dev Recalculates interest and also conducts check and balances
     */
    function newLoan(
        uint256 _paymentPeriod,
        uint256 _principal,
        address _tokenAddress
    ) public payable {
        uint256 collateralInCBLT;
        uint256 finalPrincipal;
        uint256 monthlyPayment;
        uint256 tokenPrice = oracle.priceOfToken(address(_tokenAddress));
        (
            uint256 riskScore,
            uint256 riskFactor,
            uint256 interestRate,
            uint256 userMaxTier,
            uint256 flatfee
        ) = NFT.getUser(msg.sender);

        require(loanBook[msg.sender].initialized == false);
        require(msg.value >= flatfee);
        require(
            _paymentPeriod <= loanTiers[userMaxTier].maximumPaymentPeriod,
            "Payment period exceeds that of the tier, pleas try again"
        );

        require(
            SafeMath.div(
                _principal,
                SafeMath.div(100000000000000000000, oracle.priceOfETH())
            ) <= loanTiers[userMaxTier].principalLimit
        );

        collateralInCBLT = SafeMath.mul(
            SafeMath.div(
                SafeMath.multiply(
                    _principal,
                    SafeMath.mul(riskScore, riskFactor),
                    100
                ),
                tokenPrice
            ),
            1e18
        );

        finalPrincipal = SafeMath.add(
            _principal,
            SafeMath.multiply(_principal, interestRate, 100)
        );

        require(finalPrincipal <= totalBalance, "Insufficient funds to lend");

        monthlyPayment = SafeMath.div(
            finalPrincipal,
            SafeMath.add(SafeMath.div(_paymentPeriod, 2629743), 1)
        );

        IERC20(_tokenAddress).universalTransferFromSenderToThis(
            collateralInCBLT
        );

        loanBook[msg.sender] = Loan(
            msg.sender,
            _principal,
            finalPrincipal,
            monthlyPayment,
            collateralInCBLT,
            false,
            true,
            false,
            block.timestamp,
            block.timestamp,
            loanTiers[userMaxTier].maxVoters,
            address(_tokenAddress)
        );
        loanBorrowers.push(msg.sender);
    }

    /**
     * @dev
     */
    function processPeriod(uint256 _payment, bool _missedPayment) internal {
        loanBook[msg.sender].remainingBalance = SafeMath.sub(
            loanBook[msg.sender].remainingBalance,
            _payment
        );

        loanBook[msg.sender].dueDate = SafeMath.add(block.timestamp, 2629743);

        if (_missedPayment) {
            loanBook[msg.sender].collateral = SafeMath.sub(
                loanBook[msg.sender].collateral,
                SafeMath.div(loanBook[msg.sender].collateral, 2)
            );
            // Strike system // Connected to NFT
            uint256 daysMissed = SafeMath.div(
                SafeMath.sub(block.timestamp, loanBook[msg.sender].dueDate),
                86400
            );
            if (daysMissed > 7) {
                // Suspend loan
            }
        }
    }

    /**
     * @dev
     */
    function validate(bool _status) public {
        loanBook[msg.sender].active = _status;
        loanBook[msg.sender].dueDate = SafeMath.add(block.timestamp, 2629743);
    } // Only API

    /**
     * @dev
     */
    function payVoters(address[] memory voterArr, address _load) public {
        require(
            loanBook[_load].funded == false,
            "Loan rewards have already been distributed"
        );

        uint256 rewardTotal;
        uint256 rewardPerVoter;

        (
            uint256 riskScore,
            uint256 riskFactor,
            uint256 interestRate,
            uint256 userMaxTier,
            uint256 flatfee
        ) = NFT.getUser(_load);

        rewardTotal = SafeMath.multiply(
            loanBook[msg.sender].amountBorrowed,
            interestRate,
            100
        );

        rewardPerVoter = SafeMath.div(rewardTotal, voterArr.length);

        for (uint256 i = 0; i < voterArr.length; i++) {
            payable(voterArr[i]).transfer(rewardPerVoter);
        }
    } // Only API

    /**
     * @dev Function for the user to make a payment with ETH
     *
     */
    function makePayment() public payable {
        require(msg.value >= loanBook[msg.sender].minimumPayment);
        require(loanBook[msg.sender].active == true);

        if (block.timestamp <= loanBook[msg.sender].dueDate) {
            processPeriod(msg.value, false);
        } else {
            processPeriod(msg.value, true);
        }
    }

    /**
     * @dev
     */
    function returnCollateral() public {
        uint256 amount = loanBook[msg.sender].collateral;
        require(loanBook[msg.sender].remainingBalance == 0);

        // IERC20(loanBook[msg.sender].currentToken).universalTransfer(
        //     msg.sender,
        //     amount
        // );
        loanBook[msg.sender].collateral = 0;
    }

    /**
     * @dev Deletes loan instance once the user has paid his active loan in full
     */
    function cleanSlate() public {
        require(loanBook[msg.sender].remainingBalance == 0);
        loanRecords[msg.sender].push(loanBook[msg.sender]);
        delete loanBook[msg.sender];
    }
}

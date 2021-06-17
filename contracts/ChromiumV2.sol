// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "SafeMath.sol";
import "IERC20.sol";
import "ExchangeOracle.sol";

contract ChromiumV2 {
    
    event Received(address, uint);
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    IERC20 token;
    ExchangeOracle oracle;
    
    // WORK IN PROGRESS: 
    // Need to figure out exact threshold # and updating methods
    uint256 cbltTreshhold = 1;
    
    // Made this so it compiles correctly w/ the Bank.sol code
    // Not sure if we will need this later on
    uint256 fee = 3;
    
    
    // Function that allows the user to sell CBLT for ETH
    // Takes in an amount of CBLT that will be verified by front-end
    // CBLT is then converted to correspoding amount in ETH (Prices come from oracle)
    // ETH is delivered to user
    function sellCBLT(uint256 amount) public payable {
        
        // Checks to make sure user does not send 0 ether
        require(amount > 0, "You need to sell at least some tokens");
            
        /*OLD CODE: 
        uint256 tokenRate = SafeMath.mul(amount, SafeMath.div(2, 1000));
        uint256 netAmount = SafeMath.sub(tokenRate, 3); 
        */
            
        uint256 netAmount;
        uint256 owedToUser;
        
        // WORK IN PROGRESS:
        // Fee structure from the Bank.sol contract
        // Similar in use but will need to make sure conversion between CBLT and ETH works correctly
        // Returns uint owedToUser, uint netAmount is the intermediary
        if (amount > cbltTreshhold) {
            netAmount = SafeMath.sub(
                    amount,
                SafeMath.multiply(amount, 3, 1000)
            );
            owedToUser = SafeMath.sub(amount, netAmount);
        } else {
            // Oracle call for current ETH price in USD
            uint256 ETHprice = oracle.priceOfETH();
            // Dollar fee based
            uint256 ETHinUSD = SafeMath.div(100000000000000000000, ETHprice);
            // New balance saved
            netAmount = SafeMath.sub(amount, SafeMath.mul(ETHinUSD, fee));
            owedToUser = SafeMath.sub(amount, netAmount);
        }
        //.0003 = percentage for fee
        
        payable(msg.sender).transfer(owedToUser);
    }
    
    function buy() public payable {

        /* OLD CODE:
        uint256 tokenRate = SafeMath.div(msg.value , SafeMath.div(2 , 1000 )) ;
        uint256 OwedToUser = SafeMath.sub(tokenRate , 5) ;
        */
        
        //Checks to make sure user has enough balance of ether
        //Checks to make sure user does not send 0 ether
        uint256 userBalance = token.balanceOf(address(this));
        
        require(msg.value > 0 , "You need to send some ether" );
        require(msg.value <= userBalance , " Not enough tokens in the reserve ");
        
        
        uint256 balance;
        uint256 totalFeeBalance;
        
        // WORK IN PROGRESS:
        // Fee structure from the Bank.sol contract
        // Takes in msg.value and returns totalFeeBalance
        if (msg.value > 5e18) {
            balance = SafeMath.sub(
                msg.value,
                SafeMath.multiply(msg.value, 3, 1000)
            );
            
            totalFeeBalance = SafeMath.sub(msg.value, balance);
        } else {
            // Oracle call for current ETH price in USD
            uint256 ETHprice = oracle.priceOfETH();
            // Dollar fee based
            uint256 ETHinUSD = SafeMath.div(100000000000000000000, ETHprice);
            // New balance saved
            balance = SafeMath.sub(msg.value, SafeMath.mul(ETHinUSD, fee));
            totalFeeBalance = SafeMath.sub(msg.value, balance);
        }
        
        token.transfer(msg.sender ,totalFeeBalance);


    }

    // Fallback method for receiving ETH payments
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}

// TO DO:
// - Add in the Donate Functions
// - Figure out threshold amount
// - Make sure oracle connection goes through and price/amounts convert correctly


// ===================================================== OLD CODE =====================================================


// SPDX-License-Identifier: MIT
//pragma solidity >=0.4.22 <0.9.0;
//
//import "./interfaces/UniversalERC20.sol";
//import "./interfaces/Ownable.sol";
//import "./interfaces/IUniswap.sol";
//import "./ExchangeOracle.sol";
//
//contract ChromiumV2 is Ownable {
    // using UniversalERC20 for IERC20;
    // // used to keep track of tokens in contract
    // mapping(uint256 => uint256) public cbltLiquidity;
    // uint256 cbltLiquidityMaxAmount;
    // // eth contract address
    // IERC20 private constant ETH_ADDRESS =
    //     IERC20(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
    // IUniswap private constant uniswap =
    //     IUniswap(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    // // initializing objects
    // IERC20 cbltToken;
    // ExchangeOracle oracle;
    // // emits when chromium is used
    // event ChromiumTrade(
    //     address indexed _from,
    //     address _fromToken,
    //     address _destToken,
    //     uint256 _fromAmount,
    //     uint256 _cbltAmount
    // );
    // /**
    //  * pass in the oracle contract so that it can pull info from it
    //  */
    // constructor(
    //     address _cbltToken,
    //     address _oracle,
    //     uint256 _liquidityCbltPoolAmount
    // ) {
    //     cbltToken = IERC20(_cbltToken);
    //     oracle = ExchangeOracle(_oracle);
    //     cbltLiquidityMaxAmount = _liquidityCbltPoolAmount;
    // }
    // // sets CBLT token  // only devs
    // function setCbltToken(address _cblt) external {
    //     cbltToken = IERC20(_cblt);
    // }
    // // only devs
    // function setOracle(address _oracle) external {
    //     oracle = ExchangeOracle(_oracle);
    // }
    // // only devs
    // function changeCbltLiquidityLimit(uint256 _liquidityLimit) external {
    //     cbltLiquidityMaxAmount = _liquidityLimit;
    // }
    // /************ chromium functions ************/
    // function getExchangeRate() public view returns (uint256) {
    //     (uint256 sellTokenValue, uint256 buyTokenValue, bool success) =
    //         oracle.priceOfPair(path[0], path[1]);
    //     if (success) {
    //         amounts = new uint256[](path.length);
    //         amounts[0] = amountIn;
    //         amountIn = SafeMath.sub(
    //             amountIn,
    //             SafeMath.mul(amountIn, SafeMath.div(3, 1000))
    //         );
    //         uint256 returnAmount =
    //             SafeMath.mul(
    //                 amountIn,
    //                 SafeMath.findRate(sellTokenValue, buyTokenValue)
    //             );
    //         amounts[1] = returnAmount;
    //     } else {
    //         amountIn = SafeMath.sub(
    //             amountIn,
    //             SafeMath.mul(amountIn, SafeMath.div(3, 1000))
    //         );
    //         amounts = uniswap.getAmountsOut(amountIn, path);
    //     }
    // }
    // /**
    //  * @dev this function will swap cblt tokens for tokens that are allowed
    //  */
    // function swapTokens(address[] calldata path, uint256 amount)
    //     external
    //     payable
    //     returns (uint256)
    // {
    //     require(
    //         path[0] != address(cbltToken) && path[1] != address(cbltToken),
    //         "Cblt can't be traded with this function"
    //     );
    //     uint256[] memory amounts = getExchangeRate(amount, path);
    //     if (IERC20(path[0]) == ETH_ADDRESS) {
    //         require(msg.value != 0, "Chromium:: msg.value can not equal 0");
    //         require(
    //             tokenLiquidity[path[1]] >= amounts[1],
    //             "Not enough tokens in Treasury."
    //         );
    //         IERC20(path[0]).universalTransferFromSenderToThis(amount);
    //         tokenLiquidity[path[0]] = SafeMath.add(
    //             tokenLiquidity[path[0]],
    //             amount
    //         );
    //         IERC20(path[1]).universalTransfer(msg.sender, amounts[1]);
    //         tokenLiquidity[path[1]] = SafeMath.sub(
    //             tokenLiquidity[path[1]],
    //             amounts[1]
    //         );
    //         emit ChromiumTrade(
    //             msg.sender,
    //             path[0],
    //             path[1],
    //             amount,
    //             amounts[1]
    //         );
    //         return amounts[1];
    //     } else {
    //         require(
    //             tokenLiquidity[path[1]] >= amounts[1],
    //             "Chromium:: Not enough tokens in Treasury."
    //         );
    //         IERC20(path[0]).universalTransferFromSenderToThis(amount);
    //         tokenLiquidity[path[0]] = SafeMath.add(
    //             tokenLiquidity[path[0]],
    //             amount
    //         );
    //         IERC20(path[1]).universalTransfer(msg.sender, amounts[1]);
    //         emit ChromiumTrade(
    //             msg.sender,
    //             path[0],
    //             path[1],
    //             amount,
    //             amounts[1]
    //         );
    //         return amounts[1];
    //     }
    // }
    // function swapCblt(address[] calldata path, uint256 amount)
    //     external
    //     payable
    //     returns (uint256)
    // {
    //     require(
    //         path[0] == address(cbltToken),
    //         "Chromium:: fromToken needs to be cbltToken."
    //     );
    //     uint256[] memory amounts = getExchangeRate(amount, path);
    //     require(
    //         tokenLiquidity[path[1]] >= amounts[1],
    //         "Not enough tokens in treasury."
    //     );
    //     cbltToken.universalTransferFromSenderToThis(amount);
    //     uint256 temp = getCbltPool(amount);
    //     cbltLiquidity[temp] = SafeMath.add(cbltLiquidity[temp], amount);
    //     IERC20(path[1]).universalTransfer(msg.sender, amounts[1]);
    //     tokenLiquidity[path[1]] = SafeMath.sub(
    //         tokenLiquidity[path[1]],
    //         amounts[1]
    //     );
    //     emit ChromiumTrade(msg.sender, path[0], path[1], amount, amounts[1]);
    //     return amounts[1];
    // }
    // function swapForCblt(address[] calldata path, uint256 amount)
    //     external
    //     payable
    //     returns (uint256)
    // {
    //     require(
    //         path[1] == address(cbltToken),
    //         "Chromium:: destToken needs to be cbltToken."
    //     );
    //     uint256[] memory amounts = getExchangeRate(amount, path);
    //     uint256 temp = getCbltPool(amounts[1]);
    //     if (IERC20(path[0]) == ETH_ADDRESS) {
    //         require(msg.value != 0, "Chromium:: msg.value can not equal 0");
    //         require(
    //             cbltLiquidity[temp] >= amounts[1],
    //             "Not enough cblt tokens in pool for 1000 and up in Treasury."
    //         );
    //         IERC20(path[0]).universalTransferFromSenderToThis(amount);
    //         tokenLiquidity[path[0]] = SafeMath.add(
    //             tokenLiquidity[path[0]],
    //             amount
    //         );
    //         cbltLiquidity[temp] = SafeMath.sub(cbltLiquidity[temp], amounts[1]);
    //         cbltToken.universalTransfer(msg.sender, amounts[1]);
    //         emit ChromiumTrade(
    //             msg.sender,
    //             path[0],
    //             path[1],
    //             amount,
    //             amounts[1]
    //         );
    //         return amounts[1];
    //     } else {
    //         require(
    //             cbltLiquidity[temp] >= amounts[1],
    //             "Not enough cblt tokens in pool for 1000 and down in Treasury."
    //         );
    //         IERC20(path[0]).universalTransferFromSenderToThis(amount);
    //         tokenLiquidity[path[0]] = SafeMath.add(
    //             tokenLiquidity[path[0]],
    //             amount
    //         );
    //         cbltLiquidity[temp] = SafeMath.sub(cbltLiquidity[temp], amounts[1]);
    //         cbltToken.universalTransfer(msg.sender, amounts[1]);
    //         emit ChromiumTrade(
    //             msg.sender,
    //             path[0],
    //             path[1],
    //             amount,
    //             amounts[1]
    //         );
    //         return amounts[1];
    //     }
    // }
    // function addCbltToPool(uint256 _poolNumber, uint256 _amount)
    //     external
    //     onlyOwner
    // {
    //     cbltToken.universalTransferFromSenderToThis(_amount);
    //     cbltLiquidity[_poolNumber] = SafeMath.add(
    //         cbltLiquidity[_poolNumber],
    //         _amount
    //     );
    // }
    // function addNewTokenToPool(address _token, uint256 _amount) external {
    //     IERC20(_token).universalTransferFromSenderToThis(_amount);
    //     tokenLiquidity[_token] = SafeMath.add(tokenLiquidity[_token], _amount);
    //     tokenApproval[_token] = TokenInfo(false, false);
    // }
    // function retrieveTokens(IERC20 _token, uint256 amount) external onlyOwner {
    //     require(
    //         cbltToken != _token,
    //         "Chromium:: can't withdraw CBLT with this function."
    //     );
    //     require(
    //         amount <= tokenLiquidity[address(_token)],
    //         "Chromium:: not enough tokens in exchange."
    //     );
    //     _token.universalTransfer(msg.sender, amount);
    //     tokenLiquidity[address(_token)] = SafeMath.sub(
    //         tokenLiquidity[address(_token)],
    //         amount
    //     );
    // }
    // function retrieveCBLT(uint256 liquidityPool, uint256 amount)
    //     external
    //     onlyOwner
    // {
    //     require(
    //         amount <= cbltLiquidity[liquidityPool],
    //         "Chromium:: not enough CBLT in this liquidity pool."
    //     );
    //     cbltToken.universalTransfer(msg.sender, amount);
    //     cbltLiquidity[liquidityPool] = SafeMath.sub(
    //         cbltLiquidity[liquidityPool],
    //         amount
    //     );
    // }
    // function getCbltPool(uint256 amount) internal view returns (uint256) {
    //     if (amount >= cbltLiquidityMaxAmount) {
    //         return 1;
    //     } else {
    //         return 2;
    //     }
    // }
    // // fallback function
    // receive() external payable {}
//}
//

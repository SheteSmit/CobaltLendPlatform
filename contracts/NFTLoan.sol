// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./interfaces/SafeMath.sol";
import "./ExchangeOracle.sol";

contract NFTLoan {
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );

    /**
     * @dev String that stores the name of the NFT
     */
    string internal nftName;

    /**
     * @dev Mapping with key value uint256, used to attach the NFTid to an address
     */
    mapping(uint256 => address) internal ownerId;

    /**
     * @dev Mapping with key value address, used to show the variety of NFT data that belongs to an address
     */
    mapping(address => Data) private userData;

    /**
     * @dev Mapping with key value address, used to return the number of NFTs an address owns
     */
    mapping(address => uint256) private ownerToNFTokenCount;

    /**
     * @dev Mapping with key value uint256, used to attcah the NFTid to the NFT name
     */
    mapping(uint256 => string) private idToUri;

    /**
     * @dev creating oracle instance
     */
    ExchangeOracle oracle;
    address Treasury;

    /**
     * @dev Struct to store user data inside the NFT
     */
    struct Data {
        uint256 riskScore;
        uint256 riskFactor;
        uint256 interestRate;
        uint256 userMaxTier;
        uint256 flatfee;
        uint256 strikes;
    }

    /**
     * @dev Modifier checks if the msg.sender is the same as the tokenOwner
     */
    modifier canTransfer(uint256 _tokenId) {
        address tokenOwner = ownerId[_tokenId];
        require(tokenOwner == msg.sender);
        _;
    }

    /**
     * @dev Modifier checks to make sure that the NFTid does not belong to an empty address
     */
    modifier validNFToken(uint256 _tokenId) {
        require(ownerId[_tokenId] != address(0));
        _;
    }

    /**
     * @dev Modifier checks to make sure that the msg.sender belongs to the oracle or treasury address
     */
    modifier validEntry() {
        require(msg.sender == address(oracle) || msg.sender == Treasury);
        _;
    }

    constructor(address _oracle, address _treasury) {
        nftName = "CNFT";
        oracle = ExchangeOracle(_oracle);
        Treasury = _treasury;
    }

    /**
     * @dev Getter function that determines the number of NFTs a particular address owns
     * @param _owner The owner's address
     * @return Returns a uint256
     */
    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0));
        return _getOwnerNFTCount(_owner);
    }

    /**
     * @dev Getter function that determines the owner of a NFTid
     * @param _tokenId The NFTid you want to check
     * @return _owner Returns an address
     */
    function ownerOf(uint256 _tokenId) external view returns (address _owner) {
        _owner = ownerId[_tokenId];
        require(_owner != address(0));
        return ownerId[_tokenId];
    }

    /**
     * @dev No transfers, function not needed
     */
    function _safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) private canTransfer(_tokenId) validNFToken(_tokenId) {
        require(false == true); // Turned off - No transfer
    }

    /**
     * @dev No transfers, function not needed
     */
    function _transfer(address _to, uint256 _tokenId) internal {
        require(false == true); // Turned off - No transfer
    }

    /**
     * @dev Getter function that returns the name of the NFT (string)
     */
    function name() external view returns (string memory _name) {
        _name = nftName;
    }

    /**
     * @dev Setter function that sets the name of the nftName
     * @param _tokenId The NFTid of the token
     * @param _uri The name you want to assign
     */
    function _setTokenUri(uint256 _tokenId, string memory _uri)
        internal
        validNFToken(_tokenId)
    {
        idToUri[_tokenId] = _uri;
    }

    /**
     * @dev Facilitates the creation of a new NFT. The function check to make sure
     * the NFTid is unique and that the owner is currently an empty address
     * before transferring to the account
     * @param _to The address that will receive the NFT
     * @param _tokenId The NFTid
     */
    function _mint(address _to, uint256 _tokenId) internal {
        require(_to != address(0));
        require(ownerId[_tokenId] == address(0));

        _addNFToken(_to, _tokenId);

        emit Transfer(address(this), _to, _tokenId);
    }

    /**
     * @dev Mints an NFT for the borrower by calling previous functions
     * and accessing data from the struct
     * @param _to The address that will receive the NFT
     * @param _tokenId The NFTid
     * @param _riskScore The riskScore of the receiver
     * @param _riskFactor The riskFactor of the receiver
     * @param _interestRate The interestRate the receiver is charged
     * @param _userMaxTier The max tier of the receiver
     * @param _flatfee The fee applied when receiving an NFT
     */
    function mintBorrower(
        address _to,
        uint256 _tokenId,
        uint64 _riskScore,
        uint64 _riskFactor,
        uint64 _interestRate,
        uint64 _userMaxTier,
        uint256 _flatfee,
        string memory _uri
    ) public validEntry {
        _mint(_to, _tokenId);
        _setTokenUri(_tokenId, _uri);
        userData[_to] = Data(
            _riskScore,
            _riskFactor,
            _interestRate,
            _userMaxTier,
            _flatfee,
            0
        );
    }

    /**
     * @dev Function used to update the Data struct of the client
     * @param _to The address that needs to updated
     * @param _riskScore The riskScore of the receiver
     * @param _riskFactor The riskFactor of the receiver
     * @param _interestRate The interestRate the receiver is charged
     * @param _userMaxTier The max tier of the receiver
     * @param _flatfee The fee applied when receiving an NFT
     */
    function updateBorrower(
        address _to,
        uint64 _riskScore,
        uint64 _riskFactor,
        uint64 _interestRate,
        uint64 _userMaxTier,
        uint256 _flatfee
    ) public validEntry {
        userData[_to] = Data(
            _riskScore,
            _riskFactor,
            _interestRate,
            _userMaxTier,
            _flatfee,
            0
        );
    }

    /**
     * @dev Setter function that adds to the ownerToNFTokenCount
     * @param _to The address of the receiver
     * @param _tokenId The NFTid of the token
     */
    function _addNFToken(address _to, uint256 _tokenId) internal {
        require(ownerId[_tokenId] == address(0));

        ownerId[_tokenId] = _to;
        ownerToNFTokenCount[_to] = ownerToNFTokenCount[_to] + 1;
    }

    /**
     * @dev Function that removes an NFTid from the ownerId mapping
     * and also reduces their ownerToNFTokenCount
     * @param _from The address that you want to delete
     * @param _tokenId The NFTid of the token
     */
    function _removeNFToken(address _from, uint256 _tokenId) internal {
        require(ownerId[_tokenId] == _from);
        ownerToNFTokenCount[_from] = ownerToNFTokenCount[_from] - 1;
        delete ownerId[_tokenId];
    }

    /**
     * @dev Getter function returns the number of NFTs an address owns
     * @param _owner The address of the owner
     */
    function _getOwnerNFTCount(address _owner) internal view returns (uint256) {
        return ownerToNFTokenCount[_owner];
    }

    /**
     * @dev Function used to increase a user's riskScore
     * @param _from The address of the penalized user
     * @notice Used when a user misses a payment on their loan
     */
    function strikeBorrower(address _from) public validEntry {
        userData[_from].riskScore = SafeMath.add(userData[_from].riskScore, 1);
    }

    /**
     * @dev Getter function that returns the information from the Data struct
     * @param _from The address of the user
     */
    function getUser(address _from)
        public
        view
        validEntry
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            userData[_from].riskScore,
            userData[_from].riskFactor,
            userData[_from].interestRate,
            userData[_from].userMaxTier,
            userData[_from].flatfee
        );
    }

    /**
     * @dev Setter function that updates the oracle address
     */
    function setOracleNFT() public validEntry {
        address newOracle = oracle.addressChange(50, "setOracleNFT");
        oracle = ExchangeOracle(newOracle);
    }

    /**
     * @dev Setter function that updates the treasury address
     */
    function setTreasury() public validEntry {
        address newTreasury = oracle.addressChange(50, "setTreasury");
        Treasury = newTreasury;
    }
}

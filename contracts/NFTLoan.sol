// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./interfaces/SafeMath.sol";
import "./ExchangeOracle.sol";

contract NFTLoan {
    string internal nftName;

    mapping(uint256 => address) internal ownerId;

    mapping(address => Data) private userData;

    mapping(address => uint256) private ownerToNFTokenCount;

    mapping(uint256 => string) private idToUri;

    ExchangeOracle oracle;
    address Treasury;

    struct Data {
        uint256 riskScore;
        uint256 riskFactor;
        uint256 interestRate;
        uint256 userMaxTier;
        uint256 flatfee;
        uint256 strikes;
    }

    modifier canTransfer(uint256 _tokenId) {
        address tokenOwner = ownerId[_tokenId];
        require(tokenOwner == msg.sender);
        _;
    }

    modifier validNFToken(uint256 _tokenId) {
        require(ownerId[_tokenId] != address(0));
        _;
    }

    modifier validEntry() {
        require(msg.sender == address(oracle) || msg.sender == Treasury);
        _;
    }

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );

    constructor(address _oracle, address _treasury) {
        nftName = "CNFT";
        oracle = ExchangeOracle(_oracle);
        Treasury = _treasury;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0));
        return _getOwnerNFTCount(_owner);
    }

    function ownerOf(uint256 _tokenId) external view returns (address _owner) {
        _owner = ownerId[_tokenId];
        require(_owner != address(0));
    }

    function _safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) private canTransfer(_tokenId) validNFToken(_tokenId) {
        require(false == true); // Turned off - No transfer
    }

    function _transfer(address _to, uint256 _tokenId) internal {
        require(false == true); // Turned off - No transfer
    }

    function name() external view returns (string memory _name) {
        _name = nftName;
    }

    function _setTokenUri(uint256 _tokenId, string memory _uri)
        internal
        validNFToken(_tokenId)
    {
        idToUri[_tokenId] = _uri;
    }

    function _mint(address _to, uint256 _tokenId) internal {
        require(_to != address(0));
        require(ownerId[_tokenId] == address(0));

        _addNFToken(_to, _tokenId);

        emit Transfer(address(this), _to, _tokenId);
    }

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

    function _addNFToken(address _to, uint256 _tokenId) internal {
        require(ownerId[_tokenId] == address(0));

        ownerId[_tokenId] = _to;
        ownerToNFTokenCount[_to] = ownerToNFTokenCount[_to] + 1;
    }

    function _removeNFToken(address _from, uint256 _tokenId) internal {
        require(ownerId[_tokenId] == _from);
        ownerToNFTokenCount[_from] = ownerToNFTokenCount[_from] - 1;
        delete ownerId[_tokenId];
    }

    function _getOwnerNFTCount(address _owner) internal view returns (uint256) {
        return ownerToNFTokenCount[_owner];
    }

    function strikeBorrower(address _from) public validEntry {
        userData[_from].riskScore = SafeMath.add(userData[_from].riskScore, 1);
    }

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

    function setOracleNFT() public validEntry {
        address newOracle = oracle.addressChange(50, "setOracleNFT");
        oracle = ExchangeOracle(newOracle);
    }

    function setTreasury() public validEntry {
        address newTreasury = oracle.addressChange(50, "setTreasury");
        Treasury = newTreasury;
    }
}

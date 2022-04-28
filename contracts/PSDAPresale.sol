// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PSDAPresale is Ownable, ReentrancyGuard {
  using SafeERC20 for IERC20;

  /// @notice Event emitted when owner has set starting time.
  event StartingTimeSet(uint256 time);

  /// @notice Event emitted when user purchased the tokens.
  event Purchased(address user, uint256 amount, uint256 total);

  IERC20 private daiToken;

  address public multiSig;

  uint256 public startingTime;
  uint256 public maxDaiPerInvestor;
  uint256 public maxDai;
  uint256 public totalDai;

  mapping(address => uint256) public presaleCounter;

  // declare bytes32 variables to store root (a hash)
  bytes32 public merkleRoot;

  modifier isValidAddress(address _address) {
    require(_address != address(0), "pSDA Presale: INVALID ADDRESS");
    _;
  }

  constructor(
    address _daiToken,
    address _multiSig,
    uint256 _startingTime,
    uint256 _maxDaiPerInvestor,
    uint256 _maxDai,
    bytes32 _merkleRoot
  ) isValidAddress(_daiToken) isValidAddress(_multiSig) {
    daiToken = IERC20(_daiToken);
    multiSig = _multiSig;
    maxDaiPerInvestor = _maxDaiPerInvestor;
    startingTime = _startingTime;
    maxDai = _maxDai;
    merkleRoot = _merkleRoot;
  }

  modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  // function to set the root of Merkle Tree
  function setMerkleRoot(bytes32 _root) external onlyOwner {
    merkleRoot = _root;
  }

  /**
   * @dev External function to set starting time. This function can be called only by owner.
   */
  function setStartingTime(uint256 _newTime) external onlyOwner {
    startingTime = _newTime;

    emit StartingTimeSet(_newTime);
  }

  /**
   * @dev External function to set starting time. This function can be called only by owner.
   */
  function setMultiSigAdddress(address _newAddress) external onlyOwner {
    multiSig = _newAddress;
  }

  function purchase(uint256 _amount, bytes32[] calldata _merkleProof)
    external
    payable
    callerIsUser
    nonReentrant
  {
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));

    require(block.timestamp >= startingTime, "Not time to purchase");
    require(
      presaleCounter[msg.sender] + _amount <= maxDaiPerInvestor,
      "Exceeded max value to purchase"
    );
    require(totalDai + _amount <= maxDai, "Purchase would exceed max DAI");
    require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid merkle proof");

    daiToken.transferFrom(msg.sender, multiSig, _amount);

    presaleCounter[msg.sender] += _amount;
    totalDai += _amount;
    emit Purchased(msg.sender, _amount, totalDai);
  }
}

pragma solidity ^0.4.20;

interface TOKEN {
  function transfer(address to, uint256 value, bytes data) returns (bool success);
  function balanceOf( address owner ) public constant returns (uint);
}

contract Pony {

  uint256 public PLAY_COST = 758;

  TOKEN public flexbuxx;
  address public admin;

  struct pony {
    uint8 body;
    uint8 mane;
    uint8 ponyType;
  }

  mapping(address => pony) private _ponies;

  event NewPony(address friend, uint8 body, uint8 mane, uint8 ponyType);
    
  function Pony (address _fb) public {
    flexbuxx = TOKEN(_fb);
    admin = msg.sender;
  }

  function tokenFallback (address from, uint256 value, bytes _dc) public {
    require(value >= PLAY_COST);
    require(msg.sender == address(flexbuxx));

    _ponies[from].body = 1;
    _ponies[from].mane = 2;
    _ponies[from].ponyType = 3;

    emit NewPony(from, _ponies[from].body, _ponies[from].mane, _ponies[from].ponyType);
  }

  function withdraw () public {
    require(msg.sender == admin);
    bytes memory empty;
    require(flexbuxx.transfer(admin, flexbuxx.balanceOf(address(this)), empty));
  }

  function getPony() public view returns (uint8 body, uint8 mane, uint8 ponyType) {
    return (_ponies[msg.sender].body, _ponies[msg.sender].mane, _ponies[msg.sender].ponyType);
  }

  function _random(uint8 max) private view returns (uint8) {
    return uint8(uint256(keccak256(block.timestamp, block.difficulty))%max);
  }
}
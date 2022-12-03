// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Push.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract PushFactory {
    //user to push contract mapping
    mapping(address => address) public users;

    function CreateNewPusher(string[] memory _availableInputs) public {
        require(users[msg.sender] != address(0), "USER PRESENT");
        Push push = new Push(msg.sender, _availableInputs);
        users[msg.sender] = address(push);
    }
}

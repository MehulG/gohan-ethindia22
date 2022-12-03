// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Push.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract PushFactory {
    //user to push contract mapping
    mapping(address => address) public users;
    address public PUSH_CHANNEL_ADDRESS = 0x2Da22291ABE2934fCc9Df7e0490Ef1C3932FB5C3;

    function CreateNewPusher(string[] memory _availableInputs) public {
        require(users[msg.sender] != address(0), "USER PRESENT");
        Push push = new Push(msg.sender, _availableInputs, PUSH_CHANNEL_ADDRESS);
        users[msg.sender] = address(push);
    }
}

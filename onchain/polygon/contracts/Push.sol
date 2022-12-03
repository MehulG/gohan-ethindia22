// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Push {
    address public USER;
    string[] public availableParams;
    string[] public availableOps = ["Max", "Min", "Avg", "MAvg"];

    constructor(address _user, string[] memory _availableParams) {
        USER = _user;
        availableParams = _availableParams;
    }

    function checkParam(string memory _param) internal view returns (bool) {
        for (uint256 i = 0; i < availableParams.length; i++) {
            if (
                keccak256(abi.encodePacked(availableParams[i])) ==
                keccak256(abi.encodePacked(_param))
            ) {
                return true;
            }
        }
        return false;
    }

    function checkOps(string[] memory _ops) internal view returns (bool) {
        for (uint j = 0; j < _ops.length; j++) {
            for (uint256 i = 0; i < availableOps.length; i++) {
                if (
                    keccak256(abi.encodePacked(availableOps[i])) !=
                    keccak256(abi.encodePacked(_ops[j]))
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    modifier onlyUser() {
        require(msg.sender == USER, "ONLY USER");
        _;
    }

    function requestUser(
        string memory _param,
        string[] memory _ops,
        uint256[] memory _compParams
    ) external {
        require(checkParam(_param), "UNSUPPORTED PARAM");
        require(checkOps(_ops), "UNSUPPORTED OPS");
        require(_compParams.length == 2, "INVALID COMPPARAMS");
        //emit event with this data
    }

    function responseBack(address _requestor, bytes32 data) external onlyUser {
        //emit event here
    }
}

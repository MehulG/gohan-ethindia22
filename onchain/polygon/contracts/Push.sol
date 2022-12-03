// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Strings.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";
// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract Push {
    address public USER;
    address public PUSH_CHANNEL_ADDRESS;
    address public PUSH_CONTRACT_ADDRESS = 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;
    string[] public availableParams;
    string[] public availableOps = ["Max", "Min", "Avg", "MAvg"];
    
    constructor(address _user, string[] memory _availableParams, address _pushChannelAddress) {
        USER = _user;
        availableParams = _availableParams;
        PUSH_CHANNEL_ADDRESS = _pushChannelAddress;
    }

    function sendNotification(address _to, string memory _title, string memory _body) internal {
        IPUSHCommInterface(PUSH_CONTRACT_ADDRESS)
            .sendNotification(
                PUSH_CHANNEL_ADDRESS,
                _to,
                bytes(
                    string(
                        abi.encodePacked(
                            "0",
                            "+",
                            "3",
                            "+",
                            _title,
                            "+",
                            _body
                        )
                    )
                )
            );
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
        // ReqData memory reqData = ReqData(_param, _ops, _compParams);
        
        string memory data = _param;
        string.concat(data, "|");
        
        for (uint i = 0; i < _ops.length; i++) {
            string.concat(data, _ops[i]);
            string.concat(data, "-");
        }


        for (uint i = 0; i < _compParams.length; i++) {
            string.concat(data, Strings.toString(_compParams[i]));
            string.concat(data, "-");
        }

        //emit event with this data
        sendNotification(USER, string(abi.encodePacked(msg.sender)), data);
    }

    function responseBack(address _requestor, string memory data) external onlyUser {
        //emit event here
        sendNotification(_requestor, string(abi.encodePacked(USER)), data);
    }

}
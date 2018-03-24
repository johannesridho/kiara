pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

contract SmartContract {
    string public standard = 'SmartContract 0.1';

    struct Ownership {
        uint houseId;
        bytes32 data;
    }

    mapping (address => Ownership[]) public ownerships;

    function SmartContract() {}

    function addOwnerships(uint houseId, bytes32 data) {
        ownerships[msg.sender].push(Ownership({
            houseId: houseId,
            data: data
        }));
    }

    function getOwnerships() public constant returns (Ownership[]) {
        return ownerships[msg.sender];
    }
}

pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

contract SmartContract {
    string public standard = 'SmartContract 0.1';

    struct Ownership {
        uint houseId;
        bytes32 data;
    }

    struct Submission {
        uint houseId;
        bytes32 status;
        uint256 price;
        uint256 monthlyInstallment;
    }

    struct Transaction {
        address accountAddress;
        uint256 amount;
        uint houseId;
        uint256 remainingDebt;
        uint256 price;
    }

    mapping (address => Ownership[]) public ownerships;
    mapping (address => Submission[]) public submissions;
    Transaction[] public transactions;

    function SmartContract() {}

    function addOwnership(uint houseId, bytes32 data) {
        ownerships[msg.sender].push(Ownership({
            houseId: houseId,
            data: data
        }));
    }

    function getOwnerships() public constant returns (Ownership[]) {
        return ownerships[msg.sender];
    }

    function addSubmission(uint houseId, bytes32 status, uint256 price, uint256 monthlyInstallment) {
        submissions[msg.sender].push(Submission({
            houseId: houseId,
            status: status,
            price: price,
            monthlyInstallment: monthlyInstallment
        }));
    }

    function getSubmissions() public constant returns (Submission[]) {
        return submissions[msg.sender];
    }

    function addTransaction(address accountAddress, uint256 amount, uint houseId, uint256 remainingDebt, uint256 price) {
        transactions.push(Transaction({
            accountAddress: accountAddress,
            amount: amount,
            houseId: houseId,
            remainingDebt: remainingDebt,
            price: price
        }));
    }
}

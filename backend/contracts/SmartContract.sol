pragma solidity ^0.4.21;

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

    function addOwnership(address accountAddress, uint houseId, bytes32 data) {
        ownerships[accountAddress].push(Ownership({
            houseId: houseId,
            data: data
        }));
    }

    function getOwnerships(address accountAddress) public returns (uint[], bytes32[]) {
      uint length = ownerships[accountAddress].length;
      uint[] memory houseIds = new uint[](length);
        bytes32[] memory dataArray = new bytes32[](length);

        for (uint i = 0; i < length; i++) {
            Ownership storage ownership = ownerships[accountAddress][i];
            houseIds[i] = ownership.houseId;
            dataArray[i] = ownership.data;
        }

        return (houseIds, dataArray);
    }

    function addSubmission(address accountAddress, uint houseId, bytes32 status, uint256 price, uint256 monthlyInstallment) {
        submissions[accountAddress].push(Submission({
            houseId: houseId,
            status: status,
            price: price,
            monthlyInstallment: monthlyInstallment
        }));
    }

    function getSubmissions(address accountAddress) public constant returns (uint[], bytes32[], uint256[], uint256[]) {
        uint length = submissions[accountAddress].length;
        uint[] memory houseIds = new uint[](length);
        bytes32[] memory statuses = new bytes32[](length);
        uint256[] memory prices = new uint[](length);
        uint256[] memory monthlyInstallments = new uint[](length);

        for (uint i = 0; i < length; i++) {
          Submission storage submission = submissions[accountAddress][i];
          houseIds[i] = submission.houseId;
          statuses[i] = submission.status;
          prices[i] = submission.price;
          monthlyInstallments[i] = submission.monthlyInstallment;
        }

        return (houseIds, statuses, prices, monthlyInstallments);
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

'use strict';

var assert = require('assert');
var TransactionService = require('../../modules/services/TransactionService.js');

describe('TransactionService', function () {

  it('post transaction success', function () {
    const payload = {
      "customer_id": "6666666666666666",
      "house_id": "666",
      "amount": "1000000",
    }
    return TransactionService
      .submit(payload, true)
      .then((result) => {
        assert('id' in result)
        assert('customer_id' in result)
        assert('house_id' in result)
        assert('house_price' in result)
        assert('amount' in result)
        assert('remaining' in result)
        assert('timestamp' in result)
      })
  })

  it('get transaction success', function () {
    const payload = {
      "transaction_id": "6",
    }
    return TransactionService
      .getTransaction(payload, true)
      .then((result) => {
        assert('id' in result)
        assert('customer_id' in result)
        assert('house_id' in result)
        assert('house_price' in result)
        assert('amount' in result)
        assert('remaining' in result)
        assert('timestamp' in result)
        assert.equal(result.id, payload.transaction_id)
      })
  })

  it('get transaction by customer id + house id success', function () {
    const payload = {
      "house_id": "6",
      "customer_id": "6666666666666666",
    }
    return TransactionService
      .getByCustomerHouseId(payload, true)
      .then((result) => {
        assert('id' in result)
        assert('customer_id' in result)
        assert('house_id' in result)
        assert('house_price' in result)
        assert('amount' in result)
        assert('remaining' in result)
        assert('timestamp' in result)
        assert.equal(result.house_id, payload.house_id)
        assert.equal(result.customer_id, payload.customer_id)
      })
  })

})

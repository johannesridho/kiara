'use strict';

var assert = require('assert');
var TransactionService = require('../../modules/services/TransactionService.js');

describe('TransactionService', function () {

  it('post transaction success', function () {
    const payload = {
     "customer_id": "6666666666666666",
     "amount": "1000000",
     "timestamp": "",
     "house_id": "666",
     "house_price": "100000000",
     "remaining": "99000000",
    }
    return TransactionService
      .submit(payload, true)
      .then((result) => {
        assert('id' in result)
        assert('customer_id' in result)
        assert('amount' in result)
        assert('timestamp' in result)
        assert('house_id' in result)
        assert('house_price' in result)
        assert('remaining' in result)
      })
  })

})

'use strict';

var assert = require('assert');
var SubmissionRepo = require('../../modules/repositories/SubmissionRepo.js');

describe('SubmissionRepo', function () {

  it('get', function () {
    const customerId = '666'
    return SubmissionRepo
      .get(customerId, true)
      .then((results) => {
        assert('id' in results[0])
        assert('house_id' in results[0])
        assert('house_price' in results[0])
        assert('customer_id' in results[0])
        assert('status' in results[0])
        assert('amount' in results[0])
      })
  })

  it('add', function () {
    const payload = {
      "customer_id" : "6666666666666666",
      "house_id" : "666",
      "house_price" : "100000000",
      "status" : "pending",
      "amount" : "1000000"
    }
    return SubmissionRepo
      .add(payload, true)
      .then((result) => {
        assert('id' in result)
        assert('house_id' in result)
        assert('house_price' in result)
        assert('customer_id' in result)
        assert('status' in result)
        assert('amount' in result)
      })
  })

})

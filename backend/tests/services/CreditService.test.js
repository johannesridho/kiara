'use strict';

var assert = require('assert');
var CreditService = require('../../modules/services/CreditService.js');

describe('CreditService', function () {

  it('simulate', function () {
    const payload = {
     "nilai_pinjaman": "100000000",
     "interest": "10",
     "jangka_waktu": 1
    }
    const result = CreditService.simulate(payload)
    const expected = {
      "angsuran_perbulan": "100833333.33"
    }
    assert.equal(JSON.stringify(result), JSON.stringify(expected))
  })

})

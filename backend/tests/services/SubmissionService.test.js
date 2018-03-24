'use strict';

var assert = require('assert');
var SubmissionService = require('../../modules/services/SubmissionService.js');

describe('SubmissionService', function () {

  it('post submission success', function () {
    const payload = {
      "customer_id": "6666666666666666",
      "nama": "eric",
      "tgl_lahir": "01-01-2018",
      "nama_ibu_kandung": "cartman",
      "pendapatan": 1000000,
      "email": "eric@cartman.com",
      "nomor_hp": "081666666666",
      "nomor_cif": "i5548261",
      "house_id": "6",
      "house_price": "100000000",
      "interest": "10",
      "duration_month": "240"
    }
    return SubmissionService
      .submit(payload, true)
      .then((result) => {
        assert('id' in result)
        assert('house_id' in result)
        assert('house_price' in result)
        assert('customer_id' in result)
        assert('status' in result)
        assert('amount' in result)
        assert.equal(result.status, 'pending')
      })
  })

  it('get submission success', function () {
    const payload = {
      "customer_id": "6666666666666666"
    }
    return SubmissionService
      .getSubmission(payload, true)
      .then((result) => {
        assert('id' in result)
        assert('house_id' in result)
        assert('house_price' in result)
        assert('customer_id' in result)
        assert('status' in result)
        assert('amount' in result)
        assert.equal(result.customer_id, payload.customer_id)
        assert.equal(result.status, 'pending')
      })
  })

  it('approve submission success', function () {
    const payload = {
      "submission_id": "6"
    }
    return SubmissionService
      .approve(payload, true)
      .then((result) => {
        assert('id' in result)
        assert('house_id' in result)
        assert('house_price' in result)
        assert('customer_id' in result)
        assert('status' in result)
        assert('amount' in result)
        assert('kode_booking' in result)
        assert.equal(result.id, payload.submission_id)
        assert.equal(result.status, 'approved')
      })
  })

})

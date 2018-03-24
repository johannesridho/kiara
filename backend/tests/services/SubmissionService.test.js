'use strict';

var assert = require('assert');
var SubmissionService = require('../../modules/services/SubmissionService.js');

describe('SubmissionService', function () {

  it('calculate monthly amount', function () {
    const payload = {
      "house_price": "100000000",
      "interest": "10",
      "duration_month": "240"
    }
    return SubmissionService
      .calculateMonthlyAmount(payload, true)
      .then((result) => {
        assert('amount' in result)
      })
  })

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
      "house_price": "100000001",
      "interest": "10",
      "duration_month": "120"
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
        assert.equal(result.customer_id, payload.customer_id)
        assert.equal(result.house_id, payload.house_id)
        assert.equal(result.house_price, payload.house_price)
      })
  })

  it('get submission success', function () {
    const payload = {
      "customer_id": "666"
    }
    return SubmissionService
      .getSubmission(payload, true)
      .then((results) => { 
        return results
          .forEach((result) => {
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
  })

  it('approve submission success', function () {
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
      "house_price": "100000001",
      "interest": "10",
      "duration_month": "120"
    }
    return SubmissionService
      .submit(payload, true)
      .then((result) => {
        const payload2 = {
          "submission_id": result.id
        }
        return SubmissionService
          .approve(payload2, true)
          .then((result2) => {
            assert.equal(result2.id, payload2.submission_id)
            assert.equal(result2.status, 'approved')
          })
      })
  })

})

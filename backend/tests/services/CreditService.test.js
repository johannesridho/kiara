'use strict';

var assert = require('assert');
var CreditService = require('../../modules/services/CreditService.js');

describe('CreditService', function () {

  it('simulation', function () {
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

  it('sumbission', function () {
    const payload = {
     "nik": "1234567891234567",
     "nama": "Ade",
     "tgl_lahir": "01-01-2018",
     "nama_ibu_kandung": "ibu",
     "pendapatan": 10000,
     "email": "ade@yahoo.com",
     "nomor_hp": "082123155617",
     "nomor_cif": "1116635e"
    }
    const result = CreditService.submit(payload)
    const expected = {
      "kode_booking" : "1234556784"
    }
    assert.equal(JSON.stringify(result), JSON.stringify(expected))
  })

})

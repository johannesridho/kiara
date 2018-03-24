'use strict';

var assert = require('assert');
var SubmissionService = require('../../modules/services/SubmissionService.js');

describe('SubmissionService', function () {

  it('sumbission post success', function () {
    const payload = {
     "nik": "6666666666666666",
     "nama": "eric",
     "tgl_lahir": "01-01-2018",
     "nama_ibu_kandung": "cartman",
     "pendapatan": 1000000,
     "email": "eric@cartman.com",
     "nomor_hp": "081666666666",
     "nomor_cif": "i5548261"
    }
    return SubmissionService
      .submit(payload, true)
      .then((result) => {
        assert('kode_booking' in result)
      })
  })

})

const Promise = require('bluebird')
const CONFIG = require('../config')

var CreditService = function () {}

CreditService.prototype.simulate = (arg) => {
  const result = {
    "angsuran_perbulan": "100833333.33"
  }
  return result
}

CreditService.prototype.submit = (arg) => {
  const result = {
    "kode_booking" : "1234556784"
  }
  return result
}

module.exports = new CreditService()
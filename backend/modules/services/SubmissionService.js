const Promise = require('bluebird')
const CONFIG = require('../config')

var SubmissionService = function () {}

SubmissionService.prototype.submit = (arg) => {
  const result = {
    "kode_booking" : "1234556784"
  }
  return result
}

module.exports = new SubmissionService()
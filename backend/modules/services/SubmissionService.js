const Promise = require('bluebird')
const axios = require('axios')
const CONFIG = require('../config')
const LOGGER = require('../utils/logger.js')

var SubmissionService = function () {}

SubmissionService.prototype.submit = (payload, isTest) => {
  if (isTest) {
      const result = {
        "kode_booking" : "6666666666"
      }
      return new Promise((resolve, reject) => resolve(result))
    } else {
      return axios({
          url: CONFIG.btn.host + '/credit-submission',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'apikey': CONFIG.btn.apikey
          },
          data: payload
        })
        .then((response) => response.data.payload)
        .catch((error) => {
          error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
          return {'kode_booking': null}
        })
    }
}

SubmissionService.prototype.getSubmission = (payload, isTest) => {
  if (isTest) {
      const result = {
        "id" : "6",
        "customer_id" : "" + payload.customer_id,
        "house_id" : "666",
        "house_price" : "100000000",
        "status" : "pending",
        "amount" : "1000000",
      }
      return new Promise((resolve, reject) => resolve(result))
    } else {
      // return axios({
      //     url: CONFIG.btn.host + '/credit-submission',
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'apikey': CONFIG.btn.apikey
      //     },
      //     data: payload
      //   })
      //   .then((response) => response.data.payload)
      //   .catch((error) => {
      //     error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
      //     return {'kode_booking': null}
      //   })
    }
}

SubmissionService.prototype.approve = (payload, isTest) => {
  if (isTest) {
      const result = {
        "id" : "" + payload.submission_id,
        "customer_id" : "6666666666666666",
        "house_id" : "666",
        "house_price" : "100000000",
        "status" : "approved",
        "amount" : "1000000",
      }
      return new Promise((resolve, reject) => resolve(result))
    } else {
      // return axios({
      //     url: CONFIG.btn.host + '/credit-submission',
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'apikey': CONFIG.btn.apikey
      //     },
      //     data: payload
      //   })
      //   .then((response) => response.data.payload)
      //   .catch((error) => {
      //     error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
      //     return {'kode_booking': null}
      //   })
    }
}

module.exports = new SubmissionService()
const Promise = require('bluebird')
const axios = require('axios')
const CONFIG = require('../config')
const LOGGER = require('../utils/logger.js')
const Web3Singleton = require("../repositories/Web3Singleton.js")
const ContractObject = require("../utils/ContractObject")
const SubmissionRepo = require("../repositories/SubmissionRepo.js")

const SOL = './contracts/SmartContract.sol'
const CONTRACT_NAME = 'SmartContract'
const CONTRACT_ADDRESS = '0xdd6ab28f8622f5ac3a680a944b9cde92e131ed45'

var SubmissionService = function () {}

SubmissionService.prototype.web3Instance = Web3Singleton.getInstance()

SubmissionService.prototype.submit = (payload, isTest) => {
  const sub = {
    "customer_id" : payload.customer_id,
    "house_id" : payload.house_id,
    "house_price" : payload.house_price,
    "status" : "pending",
    "amount" : null
  }
  return Promise
    .all([
      SubmissionRepo.add(sub, isTest),
      SubmissionService.prototype.calculateMonthlyAmount(payload, isTest)
    ])
    .then((proms) => {
      const amount = proms[1].amount
      let editedResult = proms[0]
      editedResult.amount = amount
      return editedResult
    })
}

SubmissionService.prototype.getSubmission = (payload, isTest) => {
  if (isTest) {
      return SubmissionRepo.get(payload.customer_id, isTest)
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
      //     return {}
      //   })
    }
}

SubmissionService.prototype.approve = (payload, isTest) => {
  if (isTest) {
      return SubmissionRepo.approve(payload.submission_id, isTest)
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
      //     return {}
      //   })
    }
}

SubmissionService.prototype.calculateMonthlyAmount = (payload, isTest) => {
  if (isTest) {
      const result = {
        "amount" : "100"
      }
      return new Promise((resolve, reject) => resolve(result))
    } else {
      return axios({
          url: CONFIG.btn.host + '/credit-simulation',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'apikey': CONFIG.btn.apikey
          },
          data: {
            "nilai_pinjaman": payload.house_price,
            "interest": payload.interest,
            "jangka_waktu": payload.duration_month
          }
        })
        .then((response) => response.data.payload)
        .then((result) => {
          return {
            'amount': result.angsuran_perbulan
          }
        })
        .catch((error) => {
          error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
          return {}
        })
    }
}

module.exports = new SubmissionService()
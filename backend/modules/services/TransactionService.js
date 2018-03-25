const Promise = require('bluebird')
const axios = require('axios')
const CONFIG = require('../config')
const LOGGER = require('../utils/logger.js')
const HouseRepo = require("../repositories/HouseRepo.js")
const TransactionRepo = require('../repositories/TransactionRepo.js')

var TransactionService = function () {}

TransactionService.prototype.submit = (payload, isTest) => {
  if (isTest) {
      const result = {
        "id": "" + (Math.floor(Math.random() * 1000000000)),
        "customer_id": payload.customer_id,
        "house_id": payload.house_id,
        "house_price": "100000000",
        "amount": payload.amount,
        "remaining": "99000000",
        "timestamp": new Date().toISOString()
      }
      return Promise
        .resolve()
        .then(() => HouseRepo.get(payload.house_id, isTest))
        .then(() => Promise.all([
          HouseRepo.get(payload.house_id, false),
          TransactionRepo.getByCustomerHouseId(payload.house_id, payload.customer_id, isTest)
        ]))
        .then((proms) => {
          const house = proms[0]
          const txs = proms[1]
          const lastRemaining = (txs.length > 0) ? txs[0].remaining : house.harga
          result.house_price = house.harga
          result.remaining = lastRemaining - payload.amount
          return TransactionRepo.add(result, isTest)
        })
    } else {
      // return axios({
      //     url: CONFIG.btn.host + '/credit-Transaction',
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

TransactionService.prototype.getTransaction = (payload, isTest) => {
  if (isTest) {
      return TransactionRepo.get(payload.transaction_id, isTest)
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

TransactionService.prototype.getByCustomerHouseId = (payload, isTest) => {
  if (isTest) {
      return TransactionRepo.getByCustomerHouseId(payload.house_id, payload.customer_id, isTest)
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

module.exports = new TransactionService()
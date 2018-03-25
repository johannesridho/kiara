const Promise = require('bluebird')
const axios = require('axios')
const CONFIG = require('../config')
const LOGGER = require('../utils/logger.js')
const Web3Singleton = require("../repositories/Web3Singleton.js")
const ContractObject = require("../utils/ContractObject")
const HouseRepo = require("../repositories/HouseRepo.js")
const TransactionRepo = require('../repositories/TransactionRepo.js')

const SOL = './contracts/SmartContract.sol'
const CONTRACT_NAME = 'SmartContract'
const CONTRACT_ADDRESS = '0xdd6ab28f8622f5ac3a680a944b9cde92e131ed45'
const USER_ADDRESS = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf'

var TransactionService = function () {}

TransactionService.prototype.web3Instance = Web3Singleton.getInstance()

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
          if (result.remaining <= 0) {
            const contractObject = new ContractObject(this.web3Instance.web3, CONTRACT_NAME, SOL)
            return contractObject
              .getContractInstanceFromAddress(CONTRACT_ADDRESS)
              .then((contractInstance) => {
                return contractInstance.addOwnership(USER_ADDRESS, result.house_id, 'approved', result.house_price, result.amount)
              })
              .then((result) => {
                console.log(result)
                return parseFloat(result[0]).toFixed(2)
              })
          }
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
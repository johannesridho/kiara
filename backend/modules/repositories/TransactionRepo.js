const Promise = require('bluebird')
const axios = require('axios')
const CONFIG = require('../config')
const LOGGER = require('../utils/logger.js')

var now = new Date()
var now2 = new Date()
now2.setHours(now2.getHours() - 1)

var TransactionRepo = function () {

  this.items = [
    {
      "id": "6",
      "customer_id": "6666666666666666",
      "house_id": "167",
      "house_price": 642468750,
      "amount": 1000000,
      "remaining": 642468750-2000000,
      "timestamp": now.toISOString()
    },
    {
      "id": "7",
      "customer_id": "6666666666666666",
      "house_id": "167",
      "house_price": 642468750,
      "amount": 1000000,
      "remaining": 642468750-1000000,
      "timestamp": now2.toISOString()
    }
  ]

  this.add = (payload, isTest) => {
    if (isTest) {
      return new Promise((resolve, reject) => {
        payload.id = "" + (Math.floor(Math.random() * 1000000000))
        this.items.push(payload)
        resolve(payload)
      })
    } else {
      // this.items
    }
  }

  this.get = (transactionId, isTest) => {
    if (isTest) {
      return new Promise((resolve, reject) => {
        const items = this.items.filter((item) => item.id == transactionId)
        const result = (items.length > 0) ? items[0] : {}
        resolve(result)
      })
    } else {
      // return axios({
      //     url: CONFIG.btn.host + '/transaction-list',
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'apikey': CONFIG.btn.apikey
      //     },
      //     data: {
      //       keyword: 'jakarta'
      //     }
      //   })
      //   .then((response) => response.data.payload.filter((item) => {
      //     return item.id_stk_kavling == transactionId
      //   }))
      //   .then((items) => {
      //     const result = (items.length > 0) ? items[0] : {}
      //     return result
      //   })
      //   .catch((error) => {
      //     error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
      //     return []
      //   })
    }
  }

  this.getByCustomerHouseId = (houseId, customerId, isTest) => {
    if (isTest) {
      return new Promise((resolve, reject) => {
        const items = this.items
          .filter((item) => (item.house_id == houseId) && (item.customer_id == customerId))
          .sort((a, b) => {
            if(a.timestamp < b.timestamp) return 1
            if(a.timestamp > b.timestamp) return -1
            return 0
          })
        resolve(items)
      })
    } else {
      // return axios({
      //     url: CONFIG.btn.host + '/transaction-list',
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'apikey': CONFIG.btn.apikey
      //     },
      //     data: {
      //       keyword: 'jakarta'
      //     }
      //   })
      //   .then((response) => response.data.payload.filter((item) => {
      //     return item.id_stk_kavling == transactionId
      //   }))
      //   .then((items) => {
      //     const result = (items.length > 0) ? items[0] : {}
      //     return result
      //   })
      //   .catch((error) => {
      //     error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
      //     return []
      //   })
    }
  }
}

module.exports = new TransactionRepo()
const Promise = require('bluebird')
const axios = require('axios')
const CONFIG = require('../config')
const LOGGER = require('../utils/logger.js')

var SubmissionRepo = function () {

  this.items = [
    {
      "id" : "6",
      "customer_id" : "666",
      "house_id" : "666",
      "house_price" : "100000000",
      "status" : "pending",
      "amount" : "1000000"
    }
  ]

  this.get = (customerId, isTest) => {
    if (isTest) {
      return new Promise((resolve, reject) => {
        const items = this.items.filter((item) => item.customer_id == customerId)
        resolve(items)
      })
    } else {
      // return axios({
      //     url: CONFIG.btn.host + '/house-list',
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'apikey': CONFIG.btn.apikey
      //     },
      //     data: {
      //       keyword: 'jakarta'
      //     }
      //   })
      //   .then((response) => response.data.payload)
      //   .catch((error) => {
      //     error.response.data.payload.errors.forEach(err => LOGGER.error(err.message))
      //     return []
      //   })
    }
  }

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

  this.approve = (submissionId, isTest) => {
    if (isTest) {
      return new Promise((resolve, reject) => {
        this.items = this.items.map((item) => {
          if (item.id == submissionId)
            item.status = 'approved'
          return item
        })
        const items = this.items.filter((item) => item.id == submissionId)
        const result = (items.length > 0) ? items[0] : {}
        resolve(result)
      })
    } else {
      // this.items
    }
  }
}

module.exports = new SubmissionRepo()
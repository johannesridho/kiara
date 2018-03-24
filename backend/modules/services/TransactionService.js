const Promise = require('bluebird')
const axios = require('axios')
const CONFIG = require('../config')
const LOGGER = require('../utils/logger.js')

var TransactionService = function () {}

TransactionService.prototype.submit = (payload, isTest) => {
  if (isTest) {
      const result = {
       "id": "6",
       "customer_id": "6666666666666666",
       "amount": "1000000",
       "timestamp": "",
       "house_id": "666",
       "house_price": "100000000",
       "remaining": "99000000",
      }
      return new Promise((resolve, reject) => resolve(result))
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

module.exports = new TransactionService()
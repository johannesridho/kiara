var express = require('express')
var router = express.Router()

const TransactionService = require('../services/TransactionService.js')

router.post('/', function(req, res) {
  const payload = req.body
  return TransactionService
    .submit(payload, true)
    .then((result) => res.send({result: result}))
})

router.get('/', function(req, res) {
  const payload = {
   "house_id": req.query.house_id,
   "customer_id": req.query.customer_id
  }
  return TransactionService
    .getByCustomerHouseId(payload, true)
    .then((result) => res.send({result: result}))
})

router.get('/:transaction_id', function(req, res) {
  const payload = {
   "transaction_id": req.params.transaction_id
  }
  return TransactionService
    .getTransaction(payload, true)
    .then((result) => res.send({result: result}))
})

module.exports = router

var express = require('express')
var router = express.Router()

const TransactionService = require('../services/TransactionService.js')

router.get('/', function(req, res) {
  const keyword = req.params.keyword
  res.send({
    result: 'ok'
  })
})

router.post('/', function(req, res) {
  const payload = req.body
  return TransactionService
    .submit(payload, true)
    .then((result) => res.send({result: result}))
})

module.exports = router

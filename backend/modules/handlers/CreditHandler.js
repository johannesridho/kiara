var express = require('express')
var router = express.Router()

const CreditService = require('../services/CreditService.js')

router.get('/', function(req, res) {
  const keyword = req.params.keyword
  res.send({
    result: 'ok'
  })
})

router.get('/simulate', function(req, res) {
  const payload = req.body
  res.send({
    result: CreditService.simulate(payload)
  })
})

router.get('/submit', function(req, res) {
  const payload = req.body
  res.send({
    result: CreditService.submit(payload)
  })
})

module.exports = router

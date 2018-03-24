var express = require('express')
var router = express.Router()

const SettlementService = require('../services/SettlementService.js')

router.get('/', function(req, res) {
  const keyword = req.params.keyword
  res.send({
    result: 'ok'
  })
})

router.get('/list/:keyword', function(req, res) {
  const keyword = req.params.keyword
  res.send({
    result: SettlementService.list(keyword)
  })
})

module.exports = router

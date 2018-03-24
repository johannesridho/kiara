var express = require('express')
var router = express.Router()

const HouseService = require('../services/HouseService.js')

router.get('/', function(req, res) {
  const keyword = req.params.keyword
  res.send({
    result: 'ok'
  })
})

router.get('/list/:keyword', function(req, res) {
  const keyword = req.params.keyword
  HouseService
    .list(keyword)
    .then((houses) => {
      return res.send({
        result: houses
      })
    })
})

module.exports = router

var express = require('express')
var router = express.Router()

const SubmissionService = require('../services/SubmissionService.js')

router.get('/', function(req, res) {
  const keyword = req.params.keyword
  res.send({
    result: 'ok'
  })
})

router.get('/submit', function(req, res) {
  const payload = req.body
  res.send({
    result: SubmissionService.submit(payload)
  })
})

module.exports = router

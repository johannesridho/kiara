var express = require('express')
var router = express.Router()

const SubmissionService = require('../services/SubmissionService.js')

router.get('/', function(req, res) {
  const keyword = req.params.keyword
  res.send({
    result: 'ok'
  })
})

router.post('/', function(req, res) {
  const payload = req.body
  return SubmissionService
    .submit(payload)
    .then((result) => res.send({result: result}))
})


router.get('/customer/:customer_id', function(req, res) {
  const payload = {
   "customer_id": "6666666666666666"
  }
  return SubmissionService
    .getSubmission(payload, true)
    .then((result) => res.send({result: result}))
})

module.exports = router

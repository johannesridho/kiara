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
    "customer_id": req.params.customer_id
  }
  return SubmissionService
    .getSubmission(payload, true)
    .then((result) => res.send({result: result}))
})

router.patch('/:submission_id/approve', function(req, res) {
  const payload = {
    "submission_id": req.params.submission_id
  }
  return SubmissionService
    .approve(payload, true)
    .then((result) => res.send({result: result}))
})

module.exports = router

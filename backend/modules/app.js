var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()
var env = process.env.NODE_ENV || 'development'
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = env == 'development'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

var routes = require('./handlers/routes.js')
var ExampleHandler = require('./handlers/ExampleHandler.js')
var HouseHandler = require('./handlers/HouseHandler.js')
var SubmissionHandler = require('./handlers/SubmissionHandler.js')
var TransactionHandler = require('./handlers/TransactionHandler.js')

app.use('/', routes)
app.use('/example', ExampleHandler)
app.use('/house', HouseHandler)
app.use('/submission', SubmissionHandler)
app.use('/transaction', TransactionHandler)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = app

'use strict'

var allConfig = require('./environments/all')
var env = process.env.NODE_ENV || 'development'
var envConfig = require('./environments/' + env)
var extend = require('node.extend')

module.exports = extend(true, allConfig, envConfig, { env: env })

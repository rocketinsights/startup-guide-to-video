'use strict'

var _ = require('lodash')
var config = require('../configs')
var express = require('express')
var router = express.Router()
var uuid = require('uuid-v4')

var AWS = require('aws-sdk')
AWS.config.region = config.aws.region
AWS.config.accessKeyId = config.aws.accessKeyId
AWS.config.secretAccessKey = config.aws.secretAccessKey
var sts = new AWS.STS()

router.post('/session-token', function (req, res) {
  var data = req.body
  var extension
  var fileMetaData

  if (!data.fileName) {
    return res.status(400).send({})
  }

  if (data.fileName.indexOf('.') === -1) {
    // fileName is required.
    return res.status(400).send({})
  }

  extension = data.fileName.substring(data.fileName.lastIndexOf('.')).toLowerCase()
  fileMetaData = _.find(config.acceptedFileTypes, function (fileType) { return fileType.extension === extension })

  if (_.isEmpty(fileMetaData)) {
    // Invalid file type.
    return res.status(400).send({})
  }

  sts.getSessionToken({}, function (err, data) {
    var payload
    if (err) {
      console.warn('ERROR generating session token', err)
      return res.status(500).send({})
    }

    payload = {
      credentials: data.Credentials,
      key: uuid()
    }

    payload.credentials.region = config.aws.region
    payload.credentials.bucket = config.aws.bucket

    res.status(200).json(payload)
  })
})

router.post('/', function (req, res) {
  var data = req.body

  if (_.isUndefined(data.Key)) {
    return res.status(400).send({})
  }

  // In our next step we will persist this to the DB in preperation of post processing.
  // Depending on your needs you will most likely want to store information about the user as well.

  res.status(200).send({})
})

module.exports = router

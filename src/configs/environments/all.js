'use strict'

var region = process.env.REGION || 'Your region'
var accessKeyId = process.env.ACCESS_KEY_ID || 'Your access key'
var secretAccessKey = process.env.SECRET_ACCESS_KEY || 'Your secret key'
var bucket = process.env.BUCKET || 'Your bucket name'

module.exports = {
  aws: {
    'region': region,
    'accessKeyId': accessKeyId,
    'secretAccessKey': secretAccessKey,
    'bucket': bucket
  },
  acceptedFileTypes: [
    {
      'extension': '.mp4',
      'contentType': 'video/mp4'
    },
    {
      'extension': '.avi',
      'contentType': 'video/avi'
    }
  ]
}

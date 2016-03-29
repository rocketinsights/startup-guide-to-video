'use strict'

var region = process.env.REGION || 'us-east-1'
var accessKeyId = process.env.ACCESS_KEY_ID || 'AKIAIE5GGYKOMRL5CZMA'
var secretAccessKey = process.env.SECRET_ACCESS_KEY || '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'
var bucket = process.env.BUCKET || 'video-startup-guide'

module.exports = {
  aws: {
    'region': region,
    'accessKeyId': accessKeyId,
    'secretAccessKey': secretAccessKey,
    'bucket': bucket
  }
}

(function ($) {
  function _getTempCredentials (file, callback) {
    var payload = {
      fileName: file.name,
      type: file.type
    }

    $.ajax({
      type: 'POST',
      url: '/api/v1/video/session-token',
      data: JSON.stringify(payload),
      dataType: 'json',
      contentType: 'application/json'
    })
    .done(function (data) {
      callback(null, data)
    })
    .fail(function () {
      callback('error fetching signed url')
    })
  }

  function _uploadFileToS3 (file, creds, key, callback) {
    var $progressBar = $('.progress-bar')
    var bucket
    var uploadParams

    window.AWS.config.update(
      {
        accessKeyId: creds.AccessKeyId,
        secretAccessKey: creds.SecretAccessKey,
        sessionToken: creds.SessionToken,
        region: creds.region
      }
    )

    bucket = new window.AWS.S3({ params: { Bucket: creds.bucket } })
    uploadParams = { Key: key, ContentType: file.type, Body: file }

    bucket.upload(uploadParams, function (err, data) {
      if (err) {
        window.alert('Error uploading file')
      }

      $progressBar.width('100%')
      callback(err, data)
    }).on('httpUploadProgress', function (fileInfo) {
      $progressBar.width(Math.floor(fileInfo.loaded / fileInfo.total * 100) + '%')
    })
  }

  function _informServerOfFile (data, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/v1/video',
      data: JSON.stringify(data)
    })
    .done(function () {
      callback()
    })
    .fail(function () {
      callback()
    })
  }

  function _handleFormSubmit () {
    // Get temporary credentials from the server
    var $form = $(this)
    var file = $form.find('input[type="file"]')[0].files[0]

    window.async.waterfall([
      function (next) {
        _getTempCredentials(file, next)
      },
      function (result, next) {
        _uploadFileToS3(file, result.credentials, result.key, next)
      },
      function (result, next) {
        _informServerOfFile(result, next)
      }
    ], function (error) {
      if (error) {
        return window.alert('Error uploading video')
      }

      window.alert('Video successfully uploaded!')
    })

    return false
  }

  function _registerEventListeners () {
    $('form').submit(_handleFormSubmit)
  }

  $(document).ready(function () {
    _registerEventListeners()
  })
})(window.jQuery)

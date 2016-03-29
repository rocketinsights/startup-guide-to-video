'use strict'

var express = require('express')
var path = require('path')

var bodyParser = require('body-parser')
var videoRoutes = require('./src/routes/').video

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'src', 'public')))

app.use('/api/v1/video', videoRoutes)
app.get('/', function (req, res) {
  res.render('home', {})
})

app.listen(3000)

module.exports = app

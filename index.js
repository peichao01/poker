#!/usr/local/bin/node

"use strict"

var url = require('url')
var _path = require('path')


var express = require('express')
var nunjucks = require('nunjucks')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
//var multer = require('multer')
var favicon = require('serve-favicon')
var morgan = require('morgan')
var uuid = require('node-uuid')

var _static = require('./server/server-static')
var combo = require('./server/server-combo')
//var log = require('./server/server-log')
var routes = require('./server/routes')

//var router = express.Router()

var app = express()

app.set('port', process.env.PORT || 8000)
app.set('views', _path.join(__dirname, 'public/templates'))
//app.engine('html')
//app.set('view engine', 'html')

nunjucks.configure(app.get('views'), {
	autoescape: true,
	express: app
})

morgan.token('id', function(req){
	return req.id
})

app.use(assignId)
//app.use(favicon())
app.use(morgan(':id :method :url :response-time'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
//app.use(multer())
app.use(cookieParser())

// combo 服务
app.use('/combo', combo(_path.join(__dirname, 'public')))
// 静态资源文件 - html
//app.use(_static.html(_path.join(__dirname, '../web/app')))
// app.use('/static', express.static(_path.join(__dirname, '../web/static')))
app.use('/public', _static.assets(_path.join(__dirname, 'public'), {
	ignoreBaseUrl: true
}))


routes(app)


app.listen(app.get('port'), function(){
	console.log('server is running on port: ' + app.get('port'));
});


function assignId(req, res, next){
	req.id = uuid.v4()
	next()
}
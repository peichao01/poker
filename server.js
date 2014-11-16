#!/usr/local/bin/node

"use strict"

var url = require('url')

var express = require('express')
var _static = require('./lib/server-static')
// var html = require('./lib/server-static-html')
var combo = require('./lib/server-combo')
var log = require('./lib/server-log')

var app = express()

var port = 80

// 把请求的路径打印出来
app.use(log)

// combo 服务
app.use('/combo', combo(__dirname + '/web'))
// 静态资源文件 - html
app.use(_static.html(__dirname + '/web/app'))
// app.use('/static', _static.assets(__dirname + '/web'))
app.use('/static', express.static(__dirname + '/web/static'))

app.listen(port);
console.log('server is running on port: ' + port);
#!/usr/local/bin/node

"use strict"

var url = require('url')
var _path = require('path')

var express = require('express')
var _static = require('./server-static')
var combo = require('./server-combo')
var log = require('./server-log')

var app = express()

var port = 80

// 把请求的路径打印出来
app.use(log)

// combo 服务
app.use('/combo', combo(_path.join(__dirname, '../web')))
// 静态资源文件 - html
app.use(_static.html(_path.join(__dirname, '../web/app')))
// app.use('/static', express.static(_path.join(__dirname, '../web/static')))
app.use('/static', _static.assets(_path.join(__dirname, '../web')))

app.listen(port);
console.log('server is running on port: ' + port);
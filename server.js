#!/usr/local/bin/node

"use strict";

var express = require('express');
var _static = require('./lib/server-static');
var combo = require('./lib/server-combo');
var log = require('./lib/server-log');

var app = express();

var port = 80;

// 把请求的路径打印出来
app.use(log);

// combo 服务
app.use('/combo', combo(__dirname + '/web'));
// 静态资源文件
app.use([/\.html$/, '/static'], _static(__dirname + '/web'));

app.listen(port);
console.log('server is running on port: ' + port);
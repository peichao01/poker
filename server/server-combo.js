"use strict"

var fs = require('fs-extra')
var _path = require('path')
var async = require('async')
var cmd = require('./cmd')
var common = require('./common')

function combo(path){
	return function(req, res, next){
		var f = req.query.f
		var baseUrl = req.query.b || ''
		if(!f) next()
		else{
			var files = f.split(',')

			common.readConfig(function (errNull, config) {
				var imod = config.imod
				var webDir = imod.server.web || ''

				var extname = _path.extname(files[0]).substr(1)
				async.map(files, function (file, callback) {
					/**
					 * process.cwd() 是项目目录
					 * webDir 是web目录所在地址，有可能不在项目的根目录，webDir 是对外暴露的资源文件目录，如 /web
					 * baseUrl 是 imod.js 和 服务器公用的文件的相对 base 路径，如 /static、/build
					 * file 是文件路径
					 *
					 * 最终结果：$projectRoot/web/static/module/geo/geo.js
					 **/
					 var projectRoot = process.cwd()
					file = _path.join(projectRoot, webDir, baseUrl, file)
					common.readFile(file, function(err, filecontent){
						cmd(filecontent, {
							filePath: file,
							webDir: webDir,
							baseUrl: imod.config.baseUrl,
							projectRoot: projectRoot,
							extname: extname
						}, callback)
					})
				}, function(err, results){
					if(err) throw JSON.stringify(err)
					common.responseContent(res, results.join('\n'), extname)
				})
			})
		}
	}
}

module.exports = combo
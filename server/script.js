/**
 * 以 CMD 格式处理 script module
 */
 "use strict"

var _path = require('path')
var nunjucks = require('nunjucks')
var common = require('./common')
var async = require('async')
var _ = require('lodash')


var tplPath = _path.join(__dirname, './cmd.tpl')

function cmd (content, params, cb) {
	if(params.extname == 'js'){
		var id = _path.relative(_path.join(params.projectRoot, params.webDir, params.baseUrl), params.filePath)
		var modConfig = _path.join(_path.dirname(params.filePath), './package.json')

		async.parallel([
			common.readFile_async(tplPath, true),
			common.readJson_async(modConfig)
		], function(err, results){
			if(err) cb(err)
			else{
				var dirname = _path.dirname(params.filePath)
				var tpl = results[0]
				var imod = results[1].imod || {}
				imod.notTransform = imod.notTransform || []

				var notTransform = _.find(imod.notTransform, function(file){
					var filePath = _path.join(dirname, file)
					return filePath === params.filePath
				})

				cb(null, nunjucks.renderString(tpl, {
					transform: !notTransform,
					id: id,
					content: content
				}))
			}
		})
	}
	else{
		cb(null, content)
	}
}


exports.cmd = cmd
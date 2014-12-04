var _path = require('path')
var common = require('./common')
var htmlFilter = require('./html-filter')
var cmd = require('./cmd')
var async = require('async')

function html (path) {
	return function(req, res, next){
		var filePath = _path.join(path, req.path)

		if(filePath.match(/\.html$/)){
			common.readFile(filePath, function (err, filecontent) {
				if(err) common.responseError(res, err)
				else htmlFilter(filecontent, function (htmlContent) {
					common.responseContent(res, htmlContent)
				})
			})
		}
		else{
			next()
		}
	}
}

function assets(path, params){
	params = params || {}
	return function(req, res, next){
		var baseUrl = params.ignoreBaseUrl ? '' : req.baseUrl
		var filePath = _path.join(path, baseUrl, req.path)
		
		var extname = _path.extname(filePath).substr(1).toLowerCase();
		if(['js', 'css'].indexOf(extname) >= 0){
			async.parallel([
				function(callback){
					common.readFile(filePath, callback)
				},
				common.readConfig
			], function(err, results){
				if(err) {
					common.responseError(res, err)
				}
				else {
					var filecontent = results[0]
					var config = results[1]
					var imod = config.imod

					cmd(filecontent, {
						filePath: filePath,
						webDir: imod.server.web,
						baseUrl: imod.config.baseUrl,
						projectRoot: process.cwd(),
						extname: extname
					}, function(err, filecontent){
						if(err) common.responseError(res, err)
						else common.responseContent(res, filecontent, extname)
					})
				}
			})
		}
		else if(['png','jpg','jpeg','gif','webp'].indexOf(extname) >= 0){
			common.checkFile(filePath, function (err) {
				if(err) common.responseError(res, err)
				else res.status(200).sendFile(filePath)
			})
		}
		else{
			next()
		}
	}
}


exports.assets = assets
exports.html = html
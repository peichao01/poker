var fs = require('fs-extra');
var async = require('async');
var _path = require('path');

function _responseError(res, err){
	var _return = '<pre>'+JSON.stringify(err, null, 4)+'</pre>'
	res.status(err.code)
		.type('html')
		.set({
			'Content-Length': _return.length
		})
		.end(_return)
}

function _responseContent (res, content, contentType) {
	res.status(200)
		.type(contentType || 'html')
		.set({
			'Content-Length': content.length
		})
		.end(content)
}

function generateError (errCode, filepath) {
	var error;
	if(typeof errCode !== 'number' && errCode.code) return errCode
	else {
		error = {code: errCode}
		switch(errCode){
			case 403:
				error.msg = 'permission denied'
				break
			case 404:
				error.msg = 'file \''+filepath+'\' not exist'
				break
			case 500:
				error.msg = 'inertal error'
				break;
		}
		return error
	}
}

function checkFile(path, checkFileCb) {
	async.series([
		function (seriesCb) {
			fs.exists(path, function(exists){
				seriesCb(exists ? null : 404)
			})
		},
		function (seriesCb) {
			fs.stat(path, function(err, stats){
				seriesCb(err ? 500 : !stats.isFile() ? 403 : null)
			})
		}
	], function (errCode, results) {
		if(errCode) checkFileCb(generateError(errCode, path))
		else checkFileCb(null)
	})
}

function readFile(path, readFileCb){
	async.series([
		function (seriesCb) {
			checkFile(path, function (err) {
				seriesCb(err)
			})
		},
		function (seriesCb) {
			fs.readFile(path, {encoding: 'utf-8'}, function (err, data) {
				seriesCb(err ? 500 : null, data)
			})
		}
	], function (errCode, results) {
		if(errCode) readFileCb(generateError(errCode, path))
		else readFileCb(null, results[1])
	})
}

exports.responseError = _responseError
exports.responseContent = _responseContent
exports.readFile = readFile
exports.checkFile = checkFile
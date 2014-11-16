var fs = require('fs-extra');
var async = require('async');
var _path = require('path');

var configFilePath = _path.resolve(process.cwd(), './package.json')

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

function generateError (errCode, filePath) {
	var error;
	if(typeof errCode !== 'number' && errCode.code) return errCode
	else {
		error = {code: errCode}
		switch(errCode){
			case 403:
				error.msg = 'permission denied'
				break
			case 404:
				error.msg = 'file \''+filePath+'\' not exist'
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

var files = {}
function readFile(path, readFileCb, cache){
	if(cache && files[path]){
		readFileCb(null, files[path])
	}
	else{
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
			else {
				var content = results[1]
				if(cache) files[path] = content
				readFileCb(null, content)
			}
		})
	}
}

function readFile_async(file, cache){
	return function (cb) {
		return readFile(file, cb, cache)
	}
}

function readJson_async(file, cache){
	return function (cb){
		return readFile(file, function(err, content){
			if(!err){
				try{
					content = JSON.parse(content)
				}
				catch(e){
					throw '[ERROR] file "'+file+'" is not a valid JSON format.'
				}
			}
			cb(err, content)
		}, cache)
	}
}

/*
 * getObjPerpertyByArr('a.b.c', {a:{b:{c: 'name'}}}) -> 'name'
 */
function getObjPerpertyByArr(arrOfProperty, host){
	if(!host) return false;
	if(arrOfProperty.length === 0) return host;
	var property = arrOfProperty.shift();
	return getObjPerpertyByArr(arrOfProperty, host[property]);
}

function readConfig(cb){
	readFile(configFilePath, function(err, content){
		if(err) throw JSON.stringify(err)
		else {
			var config
			try{
				config = JSON.parse(content)
			}
			catch(e){
				throw '[ERROR] config file "'+configFilePath+'" is not a valid JSON format.'
			}

			['imod', 'imod.server', 'imod.config', 'imod.config.env'].forEach(function(property){
				var val = getObjPerpertyByArr(property.split('.'), config)
				if(!val) throw '[ERROR] property "'+property+'" should be setted in the config file "'+configFilePath+'".'
			})
			

			cb(null, config)
		}
	})
}

exports.responseError = _responseError
exports.responseContent = _responseContent
exports.readFile = readFile
exports.checkFile = checkFile
exports.readConfig = readConfig
exports.readFile_async = readFile_async
exports.readJson_async = readJson_async
var fs = require('fs-extra')
var _path = require('path')
var common = require('./server-common')
var analyseDeps = require('./analyse-deps')
var nunjucks = require('nunjucks')
var env = new nunjucks.Environment()

env.addFilter('script', function (file, baseUrl) {
	return '<script src="' + addBaseUrl(file, baseUrl) + '" type="text/javascript"></script>'
})

env.addFilter('style', function (file, baseUrl) {
	return '<link href="' + addBaseUrl(file, baseUrl) + '" type="text/css" rel="stylesheet">'
})

env.addFilter('scriptInline', function (script) {
	return '<script>' + script + '</script>'
})

env.addFilter('main', function (mainScript, callback) {
	analyseDeps(mainScript, function (requires) {
		var _return = 'imod.use("'+mainScript+'", ' + JSON.stringify(requires) + ')'
		callback(null, _return)
	})
}, true)

env.addFilter('config', function (conf) {
	return 'imod.config(' + (typeof conf === 'string' ? conf : JSON.stringify(conf)) + ')'
})

function addBaseUrl(path, baseUrl){
	if(path.match(/^http(s?)\:/)) return path
	return _path.join(baseUrl, path)
}



function htmlFilter(htmlContent, cb){
	var configfilepath = _path.join(process.cwd(), 'package.json')
	common.checkFile(configfilepath, function (err) {
		if(err) throw '[ERROR] can not find the package.json file at "'+configfilepath+'".'
		else fs.readJson(configfilepath, function (err, packageObj) {
			if(err) throw '[ERROR] error when read "'+configfilepath+'".'
			else if(!packageObj.imod) throw '[ERROR] field "imod" should be setted.'
			else{
				var config = packageObj.imod

				htmlContent = env.renderString(htmlContent, {
					globalStyle: config.globalStyle,
					globalScript: config.globalScript,
					imodConfig: config.config,
					baseUrl: config.config.baseUrl
				}, function (err, htmlContent) {
					if(err) throw err
					cb(htmlContent)
				})
			}
		})
	})

	
	return htmlContent
}

module.exports = htmlFilter;
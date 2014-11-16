var fs = require('fs-extra')
var _path = require('path')
var common = require('./common')
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
	common.readConfig(function (errNull, config) {
		var imod = config.imod

		htmlContent = env.renderString(htmlContent, {
			globalStyle: imod.globalStyle,
			globalScript: imod.globalScript,
			imodConfig: imod.config,
			baseUrl: imod.config.baseUrl
		}, function (err, htmlContent) {
			if(err) throw err
			cb(htmlContent)
		})
	})

	
	return htmlContent
}

module.exports = htmlFilter;
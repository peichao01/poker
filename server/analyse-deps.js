var _path = require('path')
var fs = require('fs-extra')
var common = require('./common')
var inherit = require('inherit-js')
var _ = require('lodash')

var scriptBaseDir = _path.join(process.cwd(), 'web/static')

var AnalyseMainScript = inherit({
	name: 'AnalyseMainScript',
	proto: {
		__constructor: function (options) {
			var me = this
			this.scriptCache = {}
			// 递归的输出依赖
			this.rootDependencies = {}
			this.mainScript = getFileAbsPath(ensureExtname(options.mainScript))
			// 展平的依赖
			this.flatDependencies = []
			this.matchMain = 0
			this.analyse(this.mainScript, function (script) {
				if(script === me.mainScript) me.matchMain++
				if(me.matchMain === me.rootDependencies.deps.length) {
					me.flatDependencies = _.uniq(me.flatDependencies)
					options.oncomplete && options.oncomplete(me.flatDependencies)
				}
			}, this.rootDependencies)
		},
		analyse: function(script, cb, root){
			var me = this
			me.analyseSingle(script, function(dependencies){
				root.key = script
				root.deps = new Array(dependencies.length)
				if(dependencies.length){
					dependencies.forEach(function(dependency, i){
						me.flatDependencies.push(_path.relative(scriptBaseDir, dependency))
						me.analyse(dependency, function(){
							cb(script)
						}, root.deps[i] = {})
					})
				}
				else{
					cb(script)
				}
			})
		},
		analyseSingle: function (script, cb) {
			var me = this
			if(this.scriptCache[script]) cb(this.scriptCache[script])
			else analyseSingleScript(script, function(dependencies){
				me.scriptCache[script] = dependencies
				cb(dependencies)
			})
		}
	}
})

function ensureExtname (file) {
	if(!file.match(/\.js$/)) file += '.js'
	return file
}

function getFileAbsPath (filePath, fromFileAbsPath) {
	if(filePath.indexOf('.') === 0) {
		if(!fromFileAbsPath || fromFileAbsPath.indexOf('/') !== 0) throw '[ERROR] "fromFileAbsPath"->"'+fromFileAbsPath+'" should be a absolute file path.'
		return _path.resolve(_path.dirname(fromFileAbsPath), filePath)
	}
	else return _path.join(scriptBaseDir, filePath)
}

function analyseSingleScript (scriptPath, cb) {
	common.readFile(scriptPath, function (err, scriptcontent) {
		if(err) throw '[ERROR] read file "'+scriptPath+'" error, with error: ' + JSON.stringify(err)

		var m = scriptcontent.match(/\brequire\(\s*(['"])[^'"]+\1\s*\)/g)
		var requires = m ? m.map(function (r) {
			var m = r.match(/(['"])(.+)\1/)
			return getFileAbsPath(ensureExtname(m[2]), scriptPath)
		}) : []

		cb(requires)
	})
}

function analyseDeps (mainScript, cb) {
	// 每次请求 HTML 文件都缓存一次
	var analyse = new AnalyseMainScript({
		mainScript: mainScript,
		oncomplete: cb
	})
}


module.exports = analyseDeps
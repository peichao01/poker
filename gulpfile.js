"use strict";

var gulp = require('gulp');
var nunjucks = require('nunjucks');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var through = require('through2');
var async = require('async');
var Minimize = require('minimize');
var CleanCSS = require('clean-css');
var uglifyjs = require('uglify-js');
var colors = require('colors');
var less = require('less');
var fs = require('fs-extra');
var walk = require('walk')
// var through_gulp = require('through-gulp');

var common = require('./server/common')

var Stream = require('stream');
var _path = require('path');

//var util = require('./util');
//
//var getFileContent = util.getFileContent;
//var getFilePackagePath = util.getFilePackagePath;
//var modifyPackage = util.modifyPackage;

var needMinify = true;

function task_seed(filesPath){
	return function(taskCallback) {
		if (filesPath.indexOf('*') >= 0 || filesPath.indexOf('{') >= 0) {
			var reg = new RegExp(filesPath.replace('.', '\\.').replace(/\*\*/g, '.+').replace(/\*/g, '[^\/]*').replace(/\{([^\}]+)\}/, function (match, $1) {
				return '(' + $1.split(',').join('|') + ')'
			}) + '$')
			var walker = walk.walk('public', {
				followLinks: false,
				filters: ['images']
			})
			var seed = {}
			var regRequire = '\\brequire\\(\\s*(\'|")\\s*([^\\]]+?)\\s*\\1\\s*\\)'
			walker.on('file', function (root, fileStats, next) {
				var fileName = _path.join(process.cwd(), root, fileStats.name)
				if (fileName.match(reg)) {
					var extname = _path.extname(fileName).substr(1)
					var host = seed[extname] || (seed[extname] = {})
					common.readConfig(function (err, config) {
						config = config.imod.config
						var baseUrl = config.baseUrl
						var baseDir = _path.join(process.cwd(), baseUrl)
						var fileKey = delExtname(_path.relative(baseDir, fileName))
						var regTemplate = new RegExp(config.template.replace('.', '\\.') + '$')
						// 不能直接用 fileName，因为 fileName 跟每个人的电脑路径有强关联
						host[fileKey] = host[fileKey] || {}
						if(extname == 'js'){
							common.readFile(fileName, function (err, content) {
								var alias = config.alias
								var requires = content.match(new RegExp(regRequire, 'g')) || []
								requires = requires.map(function (req) {
									req = req.match(new RegExp(regRequire))[2]

									// 相对路径
									if (req.indexOf('.') == 0) {
										// 全路径
										req = _path.join(_path.dirname(fileName), req)
										// 基于 baseDir 的路径
										req = _path.relative(baseDir, req)
									}
									// 模板
									else if(req.match(regTemplate)){
										req = _path.join(config.templatesPath, req)
									}
									// 别名
									else if (alias && alias[req]) {
										req = alias[req]
									}
									// 最标准的方式，不必处理
									// else{}

									return req
								})
								host[fileKey].requires = requires

								next()
							})
						}
						else{
							next()
						}
					})
				}
				else{
					next()
				}
			})
			walker.on('end', function () {
				fs.outputJson(_path.join(__dirname, 'seed.json'), seed, function () {
					console.log('seed was write successfully.')

					taskCallback(null)
				})
			})
		}
		else {
			common.readFile(filesPath, function (err, content) {
				taskCallback(null)
			})
		}
	}
}

function task_tpl_precompile(tplPath) {
	return function() {
		return gulp
			.src(tplPath)
			.pipe(through.obj(function (file, enc, cb) {
				async.parallel([
					common.readConfig,
					function (cb) {
						common.readFile(_path.join(__dirname, './server/template-precompile.tpl'), cb)
					}
				], function (err, results) {
					var imod = results[0].imod
					var templatesPath = imod.config.templatesPath,
						tplPrecompileTemplates = results[1];

					var contentStr = file.contents.toString();
					var precompiledContentStr = nunjucks.precompileString(contentStr, {
						name: file.relative,
						asFunction: true
					});
					var reqMatch = precompiledContentStr.match(/env\.getTemplate\(\"([^\"]+)"/g);
					var requires = reqMatch && reqMatch.map(function (match) {
						var req = match.match(/env\.getTemplate\(\"([^\"]+)"/)[1]
//						var projectRoot = process.cwd()
//						var id = common.getModuleId({
//							projectRoot: projectRoot,
//							webDir: imod.server.web,
//							baseUrl: imod.config.baseUrl,
//							filePath: _path.join(projectRoot, imod.server.web, imod.config.baseUrl, templatesPath, req)
//						})
//						return id
						return req
					})
					var moduleName = precompiledContentStr.match(/window\.nunjucksPrecompiled[^\[]+\[\"([^\"]+)\"\]/)[1];
					contentStr = nunjucks.renderString(tplPrecompileTemplates, {
						moduleContent: precompiledContentStr,
						moduleName: moduleName,
						requires: requires
					})
					file.contents = new Buffer(contentStr);
					cb(null, file);
				})
			}))
			.pipe(rename(function (path) {
				path.basename += '.html';
				path.extname = '.js';
			}))
			.pipe(gulp.dest('public/templates'));
	}
}

function task_less(lessPath){
	return function() {
		return gulp.src(lessPath)
			.pipe(through.obj(function (file, enc, callback) {
				less.render(String(file.contents), {
					paths: ['.', _path.dirname(file.path)]
				}, function (err, css) {
					if (err) {
						throw err;
					}
					try {
						file.contents = new Buffer(css);
					}
					catch (e) {
						console.log(file.path);
						console.log(css);
						throw e;
					}
					callback(null, file);
				});
			}))
			.pipe(rename(function (path) {
				path.extname = '.css';
			}))
			.pipe(gulp.dest('public'));
	}
}

gulp
	.task('seed', task_seed('public/**/*.{js,css}'))
	.task('less', task_less('public/**/*.less'))
	//.task('css', ['less'], function () {
	//	return gulp.src('public/**/*.css')
	//		.pipe(modifyPackage())
	//		.pipe(through.obj(function(file, enc, callback){
	//			if(needMinify){
	//				var minify = new CleanCSS().minify(String(file.contents));
	//				file.contents = new Buffer(minify);
	//			}
	//
	//			callback(null, file);
	//		}))
	//		.pipe(util.rename(function(path){
	//			getFileContent(getFilePackagePath(path.path), function(config){
	//				var m = path.dirname.match(/^([^\/]+\/.+)$/);
	//				path.dirname = m[1] + '/' + config.version;
	//			});
	//		}))
	//		.pipe(gulp.dest('build'));
	//})
	// 预编译 nunjucks 模板
	.task('tpl-precompile', task_tpl_precompile('public/templates/**/*.html'))
	.task('watch', function(){
		// 预编译模板
		var watcherTpl = gulp.watch('public/templates/**/*.html')
		watcherTpl.on('change', function(event){
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			task_tpl_precompile(event.path)()
		})
		// 处理 less
		var watcherLess = gulp.watch('public/**/*.less')
		watcherLess.on('change', function(event){
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			task_less(event.path)()
		})
	})




function delExtname(file){
	var t = file.match(/(.+)\.\w+$/)
	return t ? t[1] : file
}
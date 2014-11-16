var _path = require('path')
var common = require('./server-common')
var htmlFilter = require('./html-filter')

function html (path) {
	return function(req, res, next){
		var filepath = _path.join(path, req.path)

		if(filepath.match(/\.html$/)){
			common.readFile(filepath, function (err, filecontent) {
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

function assets(path){
	return function(req, res, next){
		var filepath = _path.join(path, req.baseUrl, req.path)
		
		var extname = _path.extname(filepath).substr(1).toLowerCase();
		if(['js', 'css'].indexOf(extname) >= 0){
			common.readFile(filepath, function (err, filecontent) {
				if(err) return common.responseError(res, err)
				else return common.responseContent(res, filecontent, extname)
			})
		}
		else if(['png','jpg','jpeg','gif','webp'].indexOf(extname) >= 0){
			common.checkFile(filepath, function (err) {
				if(err) return common.responseError(res, err)
				else return res.status(200).sendFile(filepath)
			})
		}
		else{
			next()
		}
	}
}


exports.assets = assets
exports.html = html
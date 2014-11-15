module.exports = function(req, res, next){
	console.log('[REQUEST URL]: ' + req.originalUrl);
	next();
}